async function sendData() {
    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            if (response.status == 401) {
                logout()
                return
            } else {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
        }
        const data = await response.json();
        console.log(data);
        showUser(data)

    } catch (error) {
        console.log(error)
        //Mostrar error al usuario mediante css o js
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
const btTest = document.getElementById("btTest")

btLogout.addEventListener("click", () => {
    logout()
})

btTest.addEventListener("click", () => {
    sendData()
})

function checkToken() {
    if (isTokenExpired()) {
        logout()
    }
}

checkToken()

function logout() {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

const form = document.getElementById("postSeries")


form.addEventListener("submit", (e) => {
    e.preventDefault()
    createSerie()
})

async function createSerie() {
    const serieName = document.getElementById("name")
    const serieType = document.getElementById("type")

    var raw = JSON.stringify({
        data: {
            "name": serieName.value,
            "type": serieType.value
        }
    });

    try {
        const token = localStorage.getItem("token")
        const response = await fetch(`${url}/series`, {
            method: "POST",
            body: raw,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            if (response.status == 401) {
                logout()
                return
            } else {
                const message = `Error: ${response.status}`;
                throw new Error(message);
            }
        }
        const data = await response.json();
        console.log(data);

        //fUNCION QUE MUESTRE LO QUE ACABO DE PONER O REDIRECCIONE HACIA ATRAS MOSTRANDO UN MENSAJE DE GUARDADO

    } catch (error) {
        console.log(error)
        //Mostrar error al usuario mediante css o js
    }

}