import { initializeApp} from 'firebase/app'
import {
    getAuth,
     signInWithRedirect,
     signInWithPopup,
     GoogleAuthProvider,
     createUserWithEmailAndPassword
    } from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBBEycweV44rTSu98PT5JXw6NZ2dOH8Jk0",
    authDomain: "levs-closet-db.firebaseapp.com",
    projectId: "levs-closet-db",
    storageBucket: "levs-closet-db.appspot.com",
    messagingSenderId: "733525957511",
    appId: "1:733525957511:web:0aafa332454b39ebd29122"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  

  
  export const db = getFirestore();

   export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!auth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password)
};