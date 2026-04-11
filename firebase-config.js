import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js';
import { getDatabase } from 'https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js';

const firebaseConfig = {
  apiKey: 'AIzaSyD6ZazsS9ssz_86DFXMwOYA8h_-2ilgxrk',
  authDomain: 'dfafy-f8fd4.firebaseapp.com',
  databaseURL: 'https://dfafy-f8fd4-default-rtdb.firebaseio.com',
  projectId: 'dfafy-f8fd4',
  storageBucket: 'dfafy-f8fd4.firebasestorage.app',
  messagingSenderId: '572527138135',
  appId: '1:572527138135:web:80f354c5baa569a68b9a12',
  measurementId: 'G-SGRGXDSDSN'
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const db2 = getFirestore(app);
export const realtimeDb = getDatabase(app);
