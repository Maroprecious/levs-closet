import { initializeApp} from 'firebase/app'
import {
    getAuth,
     signInWithRedirect,
     signInWithPopup,
     GoogleAuthProvider,
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

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
  export const db = getFirestore();

   export const createUserDocumentFromAuth = async (userAuth) => {
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
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };