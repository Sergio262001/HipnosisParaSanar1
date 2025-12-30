// Placeholder de Firebase. Reemplaza con tu config real cuando tengas proyecto.
// Puedes exponer window.FB para usos globales (auth, db, analytics, etc.).
export const fb = {
  initialized: false,
  init(config){
    if(this.initialized) return;
    // Ejemplo:
    // import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
    // const app = initializeApp(config);
    // window.FB = { app };
    this.initialized = true;
    console.log("[FB] Firebase stub listo. Agrega tu config real más adelante.");
  },
  track(eventName, payload={}){
    // En el futuro: manda a Analytics/Firestore.
    console.log("[track]", eventName, payload);
  }
};
