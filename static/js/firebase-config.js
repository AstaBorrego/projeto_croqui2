const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "projetocroqui-105df.firebaseapp.com",
  databaseURL: "https://projetocroqui-105df-default-rtdb.firebaseio.com",
  projectId: "projetocroqui-105df",
  storageBucket: "projetocroqui-105df.appspot.com",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();