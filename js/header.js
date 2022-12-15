let token = localStorage.getItem('access_token');
let nick = localStorage.getItem('user_nickname');

if (token != null) {
    document.getElementById('user_msg').innerHTML = nick + "님 환영합니다!"
    document.getElementById('sign').innerHTML = '로그아웃'
    document.getElementById('user').innerHTML = '회원정보'

    function sign() {
        localStorage.clear()
        alert("로그아웃 되었습니다!!")
        location.href = "http://parkbomin.iptime.org:8081/";
    }
    function user() {
        location.href = "http://parkbomin.iptime.org:8081/html/rog/user.html";
    }
}
else if (token == null) {
    function sign() {
        location.href = "http://parkbomin.iptime.org:8081/html/rog/rogin.html";
    }
    function user() {
        location.href = "http://parkbomin.iptime.org:8081/html/rog/register.html";
    }
}