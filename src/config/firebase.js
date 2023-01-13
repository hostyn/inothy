import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent as logEventAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);

export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;

export const logEvent = ((event, params) => logEventAnalytics(analytics, event, params));

// logEventAnalytics(analytics, 'se' )