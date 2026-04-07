import { db } from './firebase-config.js';
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

// دالة حماية النص الأصلية الخاصة بك
const _e = (s) => {
    if (!s) return '';
    const d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
};

// الدالة المسؤولة عن تحويل الرموز إلى تنسيقات 
const _formatText = (rawText) => {
    if (!rawText) return '';
    
    // 1. حماية النص من الأكواد الخبيثة أولاً
    let text = _e(rawText);
    
    // 2. تحويل # النص #p (خط كبير + أحمر + إخفاء الرمز)
    text = text.replace(/#([\s\S]*?)#p/g, '<span style="font-size: 1.5em; color: red; font-weight: bold;">$1</span>');
    
    // 3. تحويل # النص #green (خط عادي + أخضر + إخفاء الرمز)
    text = text.replace(/#([\s\S]*?)#green/g, '<span style="color: green;">$1</span>');
    
    // 4. تحويل # النص # (خط كبير فقط + إخفاء الرمز)
    text = text.replace(/#([\s\S]*?)#/g, '<span style="font-size: 1.5em; font-weight: bold;">$1</span>');
    
    // 5. تحويل النزول لسطر جديد في فايربيس إلى سطر حقيقي في الموقع
    return text.replace(/\n/g, '<br>');
};

let _p = [];
let _cf = 'all';
let _sq = '';

const _ga = (u, l) => {
    if (l && typeof call_locker_function === 'function') {
        call_locker_function();
        window.on_locker_complete = () => { window.location.href = u; };
    } else {
        window.open(u, '_blank');
    }
};

const _rp = (ps) => {
    const g = document.querySelector('.grid-layout');
    if (!g) return;
    g.innerHTML = '';
    
    if (ps.length === 0) {
        g.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem 1rem;color:var(--text-secondary);"><i class="fa-solid fa-folder-open" style="font-size:3rem;margin-bottom:1rem;opacity:0.5;"></i><p style="font-size:1.2rem;font-weight:700;">لا توجد نتائج</p></div>`;
        return;
    }
    
    const f = document.createDocumentFragment();
    ps.forEach(p => {
        const c = document.createElement('article');
        const isL = p.isLocked === true;
        const isA = p.isAffiliate === true;
        const bT = p.buttonText || (isL ? 'فتح الحيلة مجاناً' : 'انتقل للموقع');
        
        c.style.cssText = `background:var(--surface-color);border-radius:var(--radius-lg);border:1px solid ${isA ? 'var(--primary-accent)' : 'var(--border-color)'};box-shadow:var(--shadow-sm);overflow:hidden;transition:var(--transition);display:flex;flex-direction:column;position:relative;height:100%;`;
        
        c.innerHTML = `
            ${isA ? '<div style="position:absolute;top:10px;left:10px;background:#f59e0b;color:#fff;padding:4px 12px;border-radius:20px;font-size:0.7rem;font-weight:900;z-index:10;box-shadow:0 2px 10px rgba(0,0,0,0.1);">PRO RECOMMENDATION</div>' : ''}
            <div style="position:relative;height:180px;overflow:hidden;">
                <img src="${_e(p.imageUrl)}" style="width:100%;height:100%;object-fit:cover;transition:0.5s;" class="p-img">
                <span style="position:absolute;bottom:10px;right:10px;background:rgba(255,255,255,0.9);padding:2px 10px;border-radius:4px;font-size:0.7rem;font-weight:bold;color:#000;">${p.category}</span>
            </div>
            <div style="padding:1.2rem;flex:1;display:flex;flex-direction:column;">
                <h3 style="font-size:1.1rem;font-weight:900;margin-bottom:0.5rem;">${_formatText(p.title)}</h3>
                <div style="color:var(--text-secondary);font-size:0.85rem;margin-bottom:1.5rem;line-height:1.6;flex:1;">${_formatText(p.content)}</div>

                <button class="act-btn" style="width:100%;padding:12px;border:none;border-radius:8px;font-family:inherit;font-weight:900;cursor:pointer;transition:0.3s;display:flex;align-items:center;justify-content:center;gap:8px;background:${isL ? 'linear-gradient(90deg, #ef4444, #b91c1c)' : 'var(--primary-accent)'};color:#fff;">
                    <i class="fa-solid ${isL ? 'fa-lock' : 'fa-bolt'}"></i> ${bT}
                </button>
            </div>
        `;
        
        const b = c.querySelector('.act-btn');
        b.onclick = () => _ga(p.targetUrl, isL);
        
        c.onmouseenter = () => {
            c.style.transform = 'translateY(-5px)';
            c.style.boxShadow = 'var(--shadow-hover)';
            c.querySelector('.p-img').style.transform = 'scale(1.1)';
        };
        c.onmouseleave = () => {
            c.style.transform = 'none';
            c.style.boxShadow = 'var(--shadow-sm)';
            c.querySelector('.p-img').style.transform = 'scale(1)';
        };
        
        f.appendChild(c);
    });
    g.appendChild(f);
};

const _fp = async () => {
    try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const s = await getDocs(q);
        _p = [];
        s.forEach((d) => _p.push({ id: d.id, ...d.data() }));
        _fr();
    } catch (e) {
        console.error(e);
    }
};

const _fr = () => {
    let f = _p;
    if (_cf !== 'all') f = f.filter(x => x.category === _cf);
    if (_sq) {
        const q = _sq.toLowerCase();
        f = f.filter(x => x.title.toLowerCase().includes(q) || x.content.toLowerCase().includes(q));
    }
    _rp(f);
};

document.addEventListener('DOMContentLoaded', () => {
    const t = document.getElementById('theme-toggle');
    const s = document.getElementById('live-search');
    const c = document.querySelectorAll('.chip');
    
    if (t) t.onclick = () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const n = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', n);
        localStorage.setItem('theme', n);
        t.innerHTML = n === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    };
    
    window.onscroll = () => {
        const p = document.getElementById('reading-progress');
        if (p) {
            const h = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            p.style.width = (window.scrollY / h * 100) + "%";
        }
    };
    
    if (s) s.oninput = (e) => { _sq = e.target.value.trim();
        _fr(); };
    
    c.forEach(x => {
        x.onclick = () => {
            c.forEach(i => i.classList.remove('active'));
            x.classList.add('active');
            _cf = x.getAttribute('data-filter') || 'all';
            _fr();
        };
    });
    
    setTimeout(_fp, 500);
});
