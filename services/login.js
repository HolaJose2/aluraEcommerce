const form = document.querySelector("[data-form]");
const alertLogin = document.querySelector("[data-login]");

function getFormValues() {
    const email = document.querySelector("[data-email]").value;
    const password = document.querySelector("[data-password]").value;

    return { email, password };
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const { email, password } = getFormValues();

    if (email === "mono28h@gmail.com" && password === "12345") {
        alertLogin.style.display = "none";

        setTimeout(() => {
            window.location.replace("/aluraEcommerce/pages/admin/list-products.html");
        }, 1000);
    } else {
        alertLogin.style.display = "block";
    }
});
