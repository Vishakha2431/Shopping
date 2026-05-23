let msg = document.getElementById("msg");

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
let users = JSON.parse(localStorage.getItem("users")) || [];

// NAME UPDATE
function updateName() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;

    let user = users.find(u => u.email === currentUser.email);

    if (user) {
        user.fname = fname;
        user.lname = lname;

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(user));

        msg.innerText = "Name updated successfully ✅";
    }
}

// PASSWORD UPDATE
function updatePassword() {
    let oldPass = document.getElementById("oldPass").value;
    let newPass = document.getElementById("newPass").value;
    let confirmPass = document.getElementById("confirmPass").value;

    let user = users.find(u => u.email === currentUser.email);

    if (!user) return;

    if (user.password !== oldPass) {
        msg.innerText = "Old password is incorrect ❌";
        return;
    }

    if (newPass !== confirmPass) {
        msg.innerText = "Passwords do not match ❌";
        return;
    }

    user.password = newPass;

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    msg.innerText = "Password updated successfully ✅";
}