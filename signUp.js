let fname=document.getElementById("fname");
let lname=document.getElementById("lname");
let btn=document.getElementById("btn");
let email=document.getElementById("email");
let pass=document.getElementById("password");
let newPass=document.getElementById("newPassword");
let error=document.getElementById("error")

btn.addEventListener("click",()=>{
    if(  fname.value.trim() === "" ||
    lname.value.trim() === "" ||
    email.value.trim() === "" ||
    pass.value.trim() === "" ||
    newPass.value.trim() === "" ){
      error.textContent="Please Enter All Fields*";
      error.style.color="red"
    }
    else if(pass.value !== newPass.value){
     error.textContent="Passwords should match*"
     error.style.color="red";   
    }
    else{
        let users=JSON.parse(localStorage.getItem("users") )|| [];
       
        if(users.length>0){
            let curruser=users.filter((item)=> item.email === email.value)
            if(curruser.length>0){
                error.textContent="Email already Exists";
                error.style.color="red"
            }
        }
        else{
                users.push({
                    email:email.value,
                    fname:fname.value,
                    lname:lname.value,
                    password:pass.value

                })
                localStorage.setItem("users",JSON.stringify(users));
                error.textContent="SignUp successfull!"
                setTimeout(()=>{
                    window.location.href="./login.html"
                },1000)
                error.style.color="green"
            }
    }

})