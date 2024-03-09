import { initializeApp } from "firebase/app";
import { Messaging, getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCFzwYLYXsbbrexdGe4Gx-Ee2Vi1fvWeGI",
  authDomain: "reward-wale-bf147.firebaseapp.com",
  projectId: "reward-wale-bf147",
  storageBucket: "reward-wale-bf147.appspot.com",
  messagingSenderId: "233545968697",
  appId: "1:233545968697:web:ce680299c967dfb3eeb1e8",
};

export const app = initializeApp(firebaseConfig);

let messaging: Messaging;

isSupported().then((response) => {
  if (response) messaging = getMessaging(app);
});

export { messaging };
