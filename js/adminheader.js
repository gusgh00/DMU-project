if (localStorage.getItem('user_nickname') == "관리자") {
    document.getElementById('sign').innerHTML = '로그아웃'
    document.getElementById('user').innerHTML = '관리페이지'

    function sign() {
        localStorage.clear()
        alert("로그아웃 되었습니다!")
        location.href = "https://jasla.duckdns.org/";
    }
    function user() {
        location.href = "https://jasla.duckdns.org/html/admin/admin.html";
    }
}