function isTokenExpired() {
    const token = localStorage.getItem("token")

    if (!token)
        return true

    try {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        const now = (Math.floor((new Date).getTime() / 1000))

        return now >= expiry;
    } catch (error) {
        return true
    }

}

function logout() {
    localStorage.removeItem("token")
    window.location.href = "login.html"
}

//REMOTA (HEROKU)
//https://series-canarias-alberto.herokuapp.com/api
//LOCAL (MI ORDENADOR)
//http://localhost:1337/api
const url = "https://series-canarias-alberto.herokuapp.com/api"