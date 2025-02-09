// const {API_URL} = require("../../utils/constant")

const email = document.getElementById('useremail')
const pass = document.getElementById('userpass')
const LoginBtn = document.getElementById('LoginBtn')
const responseMsg = document.getElementById('responseMsg')


const API_URL = 'http://localhost:8000'

LoginBtn.addEventListener("click",async()=>{
  const useremail = email.value
  const userpass = pass.value
  console.log("in log function");
  
  try {
    const loginRes = await fetch(`${API_URL}/url/login`,{
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ 
        email: useremail,
        password: userpass 
      }) 
    
    })
    console.log('after try',loginRes);
    if(loginRes.status==200){
      window.location.href = "http://127.0.0.1:5500/client/pages/home/index.html";
    }
    const loginUser = await loginRes.json()
    console.log(loginUser);
    
    responseMsg.innerText =loginUser.msg
    console.log('SignUPuser',loginUser);

  } catch (error) {
    console.error("Something Went Wrong",error);
  }
})