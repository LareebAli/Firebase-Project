import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore,collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, uploadBytes,getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHdfRXO9w1Cy0KvrWbM5uqDRFgCNqqzq0",
  authDomain: "smit-project-e7df9.firebaseapp.com",
  projectId: "smit-project-e7df9",
  storageBucket: "smit-project-e7df9.appspot.com",
  messagingSenderId: "775513480571",
  appId: "1:775513480571:web:3e63cbe5e0880e091f31de",
  measurementId: "G-1XESGKM7Z6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const carscollection=collection(db,"cars")
console.log(storage)

const Car=document.querySelector("#car_img")
const save=document.querySelector("#Save")
const container=document.querySelector("#container")
 getImagesfromDb()
save.addEventListener("click",()=>{
  //upload file to the storage//
  const carstorageRef = ref(storage,Car.files[0].name);
  save.disabled=true
  uploadBytes(carstorageRef,Car.files[0]).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  //get download url
  getDownloadURL((carstorageRef ))
  .then((url) =>{
    console.log(url)

    addDoc(carscollection,{url,category:"car"}).then(()=>{
      console.log("doucument update")
      save.disabled=false
    })
  })
  .catch((error)=>{
    console.log(error)
save.disabled=true
}
)
})
  .catch((error)=>
console.log(error)
  )
}) 
async function getImagesfromDb(){
 
  const querySnapshot = await getDocs(carscollection);
  container.innerHTML=""
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    console.log(doc.data())
    const img=`<img id=${doc.id} scr=${doc.data().url} style="height: 300px; width: 300px; border-radius:20px ;margin:10; "/>`
    container.innerHTML+=img
  });
}