

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword ,
    onAuthStateChanged,
    signOut,
    
  
  } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
  import{
    set,
    ref,
    getDatabase
  }
  from "https://www.gstatic.com/firebasejs/11.2.0/firebase-database.js";

  
  const auth = getAuth();
  const database = getDatabase();

  
  const handleSignup = () => {
    const email = document.getElementById("email-signup").value;
    const password = document.getElementById("password-signup").value;
  
    if (email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
  
          const usersRef = ref(database , `users/${userCredentials.user.uid}/`)
          set(usersRef , {
            email: email,
            createdAt: new Date().getTime()
          })
          .then((user) => {
            console.log(user);
            alert("User Created Successfully");
            window.location.href = "../dist/quiz.html";
          })
          .catch((error)=>{
            alert(error.message);
          })
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  
  const handleLogin = () => {
      const email = document.getElementById("email-login").value;
      const password = document.getElementById("password-login").value;
    
      if (email && password) {
          signInWithEmailAndPassword(auth,email,password)
          .then((userCredentials) => {
              console.log(userCredentials);
              alert("User Logged In Successfully");
              window.location.href = "./quiz.html";
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    };
    onAuthStateChanged(auth,(user)=>{
      const LogOutBtn = document.getElementById("logout-btn")
      if(user){
          LogOutBtn.style.display = "block";
          LogOutBtn.addEventListener("click",(e)=>{
              e.preventDefault();
              signOut(auth);
              window.location.href = "./signUp.html"
          })
      }
      else{
          console.log("user not logged in");
          LogOutBtn.style.display = "none";
      }
    })
    const SignUpbtn = document.getElementById("Signup-btn")
    if(SignUpbtn){
      SignUpbtn.addEventListener("click",(e)=>{
          e.preventDefault();
          handleSignup();
      })
    }
  
    const Loginbtn = document.getElementById("Login-btn")
    if(Loginbtn){
      Loginbtn.addEventListener("click",(e)=>{
          e.preventDefault;
          handleLogin();
      })
    }
  