let email = document.getElementById("email");
let pass = document.getElementById("password");
let btn = document.getElementById("btn");
let error = document.getElementById("error");

btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (
        email.value.trim() === "" ||
        pass.value.trim() === ""
    ) {
        error.textContent = "Please Enter All Fields*";
        error.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        window.location.href = "./signUp.html";
        return;
    }

    let currUser = users.find(
        (item) =>
            item.email === email.value &&
            item.password === pass.value
    );

    if (currUser) {

        // 🔥 SAVE CURRENT USER (IMPORTANT)
        localStorage.setItem("currentUser", JSON.stringify(currUser));

        error.textContent = "Login Successful";
        error.style.color = "green";

        setTimeout(() => {
            window.location.href = "./shop.html";
        }, 1000);

    } else {

        error.textContent = "User Not Matched";
        error.style.color = "red";

        setTimeout(() => {
            window.location.href = "./signUp.html";
        }, 1500);
    }
});