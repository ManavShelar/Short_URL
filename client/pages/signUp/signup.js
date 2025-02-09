// const { API_URL } = require("../../utils/constant")
const fname = document.getElementById('username')
const email = document.getElementById('useremail')
const pass = document.getElementById('userpass')
const signupbtn = document.getElementById('signupbtn')
const responseMsg = document.getElementById('responseMsg')

const API_URL = 'http://localhost:8000'

signupbtn.addEventListener("click",async ()=>{
  const username = fname.value
  console.log('Fullname',username);
  const useremail = email.value
  console.log('Email',email);
  const userpass = pass.value
  console.log('Password',pass);
  
  try {
    const signupRes = await fetch(`${API_URL}/url/signup`,{
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ 
        fullname: username,
        email: useremail,
        password: userpass 
      })  
    })
    console.log(signupRes,'SignUpUser');
    if(signupRes.status==201){
      window.location.href = "http://127.0.0.1:5500/client/login.html";
 }
    const signupUser = await signupRes.json()
    console.log('SignUPuser',signupUser);
    responseMsg.innerText =signupUser.msg
    
  } catch (error) {
    console.error('Something went Wrong:', error);
  }
})
