import { getStorage } from 'firebase/storage';
import FirebaseApp from './FirebaseApp';

let FirebaseStorage = getStorage(FirebaseApp);

export default FirebaseStorage;