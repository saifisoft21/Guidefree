import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export function setupAppCheck(firebaseApp) {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider("6Len7assAAAAABL_triUvCUhGqEn6Nt1DIUeYTNU"),
    isTokenAutoRefreshEnabled: true
  });
}
