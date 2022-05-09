const btLogin = document.getElementById("btLogin")
const form = document.getElementById('form')

btLogin.addEventListener("click", () => {
    onLogin()
})

function onLogin() {
    const formData = new FormData(form)
    const queryString = new URLSearchParams(formData).toString()
    sendData(queryString)
}

async function sendData(queryString) {
    try {
        const response = await fetch('http://localhost:1337/api/auth/local', {
            method: "POST",
            body: queryString,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);

        localStorage.setItem("token", data.jwt)
        window.location.href = "index.html"

    } catch (error) {
        console.log(error)
    }
}
