import React , {useState} from 'react'
import Add from '../images/addAvatar.png'
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { auth , storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc , setDoc } from "firebase/firestore";
import {useNavigate,Link} from "react-router-dom";

const Register = () => {
  const [err,setErr] = useState(false);
  const navigate = useNavigate()


  const handleSubmit = async (e)=>{

    e.preventDefault()
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];  
   
    try{
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const storageRef = ref(storage, displayName);
        const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on(

  (error) => {
    // Handle unsuccessful uploads
    setErr(true);
  }, 
  () => {

    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
       await updateProfile(res.user,{
        displayName,
        photoURL : downloadURL
       });
       await setDoc(doc(db, "user", res.user.uid),{
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
    });

    await setDoc(doc(db,"userChats",res.user.uid),{});
    navigate("/");
   });
  }
 );
}
    catch(err){
        setErr(true);
    }
  };

  return (
   <div class="container1"> 
     <div class="container2">
        <span class="logo">Chat App</span>
        <span class="title">Register</span>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="display name"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="password"/>
            <input style={{ display: "none" }} type="file" id="file"/>
            <label htmlFor="file">
              <img src={Add} alt="" />
              <span>Add an avatar</span>
          </label>
            <button className='registerButton'>Sign up</button>
            {err && <span>Something went wrong</span>}
        </form>
        <p>You do have an account? 
          <Link to="/login">Login</Link>
          </p>
     </div>
   </div>
  );
}

export default Register;
