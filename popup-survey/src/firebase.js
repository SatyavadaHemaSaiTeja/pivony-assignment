import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyACfRtfh4NetsNSFzKYiGKHiy_PgYm-J0c",
  authDomain: "pivonyassignemnt.firebaseapp.com",
  projectId: "pivonyassignemnt",
  storageBucket: "pivonyassignemnt.appspot.com",
  messagingSenderId: "710843177798",
  appId: "1:710843177798:web:c38920601c02bc5a12e347",
  measurementId: "G-T7JXSZ1CQY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}


export const firestore = firebase.firestore();
const collectionName = "configurations";
const docId = "defaultId";

export const addDataWithDocId = async (data) => {
  try {
    await firestore.collection(collectionName).doc(docId).set(data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
};

export const getDataByDocId = async () => {
  try {
    const doc = await firestore.collection(collectionName).doc(docId).get();
    if (doc.exists) {
      console.log("Document data:", doc.data());
      return doc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document: ", error);
    return null;
  }
};

export const updateDataWithDocId = async (dataToUpdate) => {
  try {
    await firestore.collection(collectionName).doc(docId).update(dataToUpdate);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

