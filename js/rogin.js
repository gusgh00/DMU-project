var ema = document.getElementById('email').value;
var pwd = document.getElementById('password').value;
export { usn }
function signin() {
    console.log(ema.length)
    console.log(pwd.length)

    fetch("http://parkbomin.iptime.org:18000/user/log-in/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": document.getElementById('email').value,
            "password": document.getElementById('password').value
        })
    })
        .then(response => response.json())
        .then(response => {
            console.log(response.access_token)
            console.log(response.user_nickname)
            localStorage.setItem('access_token', response.access_token);

            const usn = response.user_nickname;
        })
    alert("로그인이 완료되었습니다!");
    location.href = "../../index.html";
}