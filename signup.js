const form = document.getElementById('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.getElementById("email")
    const username = document.getElementById("username")

    username.value = email.value
    signup(form)
})

async function signup() {
    try {
        const formData = new FormData(form)
        const queryString = new URLSearchParams(formData).toString()

        const response = await fetch(`${url}/auth/local/register`, {
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

function checkToken() {
    if (!isTokenExpired()) {
        window.location.href = "index.html"
    }
}

checkToken()