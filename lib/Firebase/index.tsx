import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC6fKzESpt2qZ2ZNbcbxBxPC3vcePsymng",
	authDomain: "auth-54f8c.firebaseapp.com",
	projectId: "auth-54f8c",
	storageBucket: "auth-54f8c.appspot.com",
	messagingSenderId: "939370633230",
	appId: "1:939370633230:web:ab78cede35664c2ca3c45f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
