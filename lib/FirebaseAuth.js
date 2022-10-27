import { initializeAuth } from 'firebase/auth';
import FirebaseApp from "./FirebaseApp";

const FirebaseAuth = initializeAuth(FirebaseApp);

export default FirebaseAuth;