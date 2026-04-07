import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

export function setupAppCheck(firebaseApp) {
  initializeAppCheck(firebaseApp, {
    provider: new ReCaptchaV3Provider("6Len7assAAAAAA-WhOkofu8siXLyWj7NuFRVTrd2"),
    isTokenAutoRefreshEnabled: true
  });
}