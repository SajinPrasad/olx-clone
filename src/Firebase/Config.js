// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqtTeEKmYJjx9T-aqGV7xvUX17J3WBdV0",
  authDomain: "olx-clone-f275c.firebaseapp.com",
  projectId: "olx-clone-f275c",
  storageBucket: "olx-clone-f275c.appspot.com",
  messagingSenderId: "486597286599",
  appId: "1:486597286599:web:f4beaaff817bbfcdbfbce2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const signUp = async (name, email, phone, password) => {
    try{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        const user = response.user
        await updateProfile(user, { displayName: name });
        await addDoc(collection(db, 'users'), {
            uid : user.uid,
            name,
            authProvider : 'local',
            email,
            phoneNumber: phone,
        });
        return true;
    } catch (error) {
        if (error) {
            console.log(error)
            toast.error(error.code)
        }
        return false;
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        return true
    } catch (error) {
        if (error) {
            console.log(error)
            toast.error(error.code.split('/')[1].split('-').join(' '))
        }
        return false
    }
}

const logout = () => {
    signOut(auth);
}

const productUpload = async (image, name, category, price, user) => {
    try {  
      // Upload image to Firebase Storage
      const storageRef = ref(storage, `/images/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      console.log( `This is the snapshot ${snapshot}`)
  
      // Get download URL for the uploaded image
      const url = await getDownloadURL(snapshot.ref);
  
      // Add product data to Firestore
      await addDoc(collection(db, 'products'), {
        name,
        category,
        price,
        imageUrl: url,
        userId: user.uid,
        createdAt: new Date().toDateString() 
      });
      console.log("Product data added to Firestore");
      return true;

    } catch (error) {
        console.error("Error uploading image:", error);
        toast.error(error.message || error.code); 
        return false;
    }
  };

const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const allProducts = querySnapshot.docs.map((doc) => {
            return({
                id: doc.id,
                ...doc.data()
            });
        });
        return allProducts
    } catch (error) {
        console.log(`Product fetching error : ${error}`)
        // toast.error(error.code.split('/')[1].split('-').join(' '))
        return [];
    }
}

const getProduct = async (id) => {
    const productRef = doc(db, 'products', id); 
    const productDocSnap = await getDoc(productRef);
    console.log('product snap fetched')
}

const getUser = async (userId) => {
    try {
        const userRef = query(collection(db, 'users'), where('uid', '==', userId));
        const userDocSnap = await getDocs(userRef);

        if (userDocSnap) {
            const user = userDocSnap.docs.map(doc => doc.data());
            return user;
        } else {
            console.warn(`User document with ID: ${userId} not found.`);
            return null;
        }
      } catch (error) {
            console.error('Error fetching user document:', error);
      }
};

export {auth, db, login, signUp, logout, productUpload, getProducts, getProduct, getUser}