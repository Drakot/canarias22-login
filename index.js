async function sendData() {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch('http://localhost:1337/api/users/me', {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
        });
        if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
        showUser(data)

    } catch (error) {
        console.log(error)
    }
}

function showUser(data) {
    const welcomeText = `Bienvenido ${data.name} ${data.surname}`

    const h3 = document.createElement("h3")
    h3.textContent = welcomeText

    document.body.appendChild(h3)
}

sendData()

const btLogout = document.getElementById("btLogout")

btLogout.addEventListener("click", () => {
    localStorage.removeItem("token")
    window.location.href = "login.html"
})

function checkToken() {
    if (isTokenExpired()) {
        localStorage.removeItem("token")
        window.location.href = "login.html"
    }
}

checkToken()