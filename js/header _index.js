let token = localStorage.getItem('access_token');
let nick = localStorage.getItem('user_nickname');

if (token != null) {
    document.getElementById('user_msg').innerHTML = nick + "님 환영합니다!"
    document.getElementById('sign').innerHTML = '로그아웃'
    document.getElementById('user').innerHTML = '회원정보'

    function sign() {
        localStorage.clear()
        alert("로그아웃 되었습니다!!")
        location.href = "index.html";
    }
    function user() {
        location.href = "html/sign/user.html";
    }
}
else if (token == null) {
    function sign() {
        location.href = "html/sign/login.html";
    }
    function user() {
        location.href = "html/sign/register.html";
    }
}