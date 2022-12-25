
var map;
var map1;
var map2;
var map3;
var label;
var slatlngsear;
let lt;
let ln;
function initTmap1() {
    map1 = new Tmapv3.Map("map1_div", {
        center: new Tmapv3.LatLng(37.500812, 126.867576),
        width: "100%",   // 지도의 넓이
        height: "90%",  // 지도의 높이
        zoom: 17   // 지도 줌레벨
    });
};
function initTmap2() {
    map2 = new Tmapv3.Map("map2_div", {
        center: new Tmapv3.LatLng(37.500812, 126.867576),
        width: "100%",   // 지도의 넓이
        height: "90%",  // 지도의 높이
        zoom: 17   // 지도 줌레벨
    });
};
function initTmap3() {
    map3 = new Tmapv3.Map("map3_div", {
        center: new Tmapv3.LatLng(37.500812, 126.867576),
        width: "100%",   // 지도의 넓이
        height: "90%",  // 지도의 높이
        zoom: 17   // 지도 줌레벨
    });
};
let paths1 = [];
let paths2 = [];
let paths3 = [];
let bomblat1 = null;
let bomblng1 = null;
let bomblat2 = null;
let bomblng2 = null;
let bomblat3 = null;
let bomblng3 = null;
let nick1 = null;
let nick2 = null;
let nick3 = null;
let bombnick1 = null;
let bombnick2 = null;
let bombnick3 = null;
function btnclick() {
    alert("관리모드를 시작합니다.");
    accimarker = setInterval(function () {
        //기본
        fetch("https://api.parkbomin.duckdns.org/admin/user-list/", {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response.MESSAGE);
                console.log(response.MESSAGE);
                let arrNum = newArray();
                let arrName = newArray();
                let arrEmail = newArray();
                let arrPhone = newArray();
                let arrLat = newArray();
                let arrLon = newArray();
                for (i = 0; i < response.MESSAGE.length; i++) { // 값 전체 가져오는법
                    arrNum[i] = i + 1;
                    arrName[i] = response.MESSAGE[i].name;
                    arrEmail[i] = response.MESSAGE[i].email;
                    arrPhone[i] = response.MESSAGE[i].phone;
                    arrLat[i] = response.MESSAGE[i].lat;
                    arrLon[i] = response.MESSAGE[i].lng;

                    nick1 = response.MESSAGE[0].nickname;
                    nick2 = response.MESSAGE[1].nickname;
                    nick3 = response.MESSAGE[2].nickname;

                    paths1 = new Tmapv3.LatLng(response.MESSAGE[0].lat, response.MESSAGE[0].lng);
                    paths2 = new Tmapv3.LatLng(response.MESSAGE[1].lat, response.MESSAGE[1].lng);
                    paths3 = new Tmapv3.LatLng(response.MESSAGE[2].lat, response.MESSAGE[2].lng);
                }
                for (i = 0; i < response.MESSAGE.length; i++) {
                    tr = document.createElement("tr");
                    tr.id = "ttrr";
                    let td1 = document.createElement("td");
                    td1.appendChild(document.createTextNode(arrNum[i] + ""));
                    let td2 = document.createElement("td");
                    td2.appendChild(document.createTextNode(arrName[i] + ""));
                    let td3 = document.createElement("td");
                    td3.appendChild(document.createTextNode(arrEmail[i]) + "");
                    let td4 = document.createElement("td");
                    td4.appendChild(document.createTextNode(arrPhone[i]) + "");
                    let td5 = document.createElement("td");
                    td5.appendChild(document.createTextNode(arrLat[i]) + "");
                    let td6 = document.createElement("td");
                    td6.appendChild(document.createTextNode(arrLon[i]) + "");
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    table.appendChild(tr);
                }
            })
        var polyline1 = new Tmapv3.Polyline({
            path: paths1,
            strokeColor: "#3D5220",
            strokeWeight: 6,
            direction: true,
            map: map1 // 지도 객체
        });
        var polyline2 = new Tmapv3.Polyline({
            path: paths2,
            strokeColor: "#3D5220",
            strokeWeight: 6,
            direction: true,
            map: map2 // 지도 객체
        });
        var polyline3 = new Tmapv3.Polyline({
            path: paths3,
            strokeColor: "#3D5220",
            strokeWeight: 6,
            direction: true,
            map: map3 // 지도 객체
        });
        fetch("https://api.parkbomin.duckdns.org/sensor/problem/", {
            method: "GET"
        })
            .then(rps => rps.json())
            .then(rps => {
                //백엔드 API와 변수 대입 판별
                if (rps.MESSAGE[0] != null) {
                    bomblat1 = rps.MESSAGE[0].lat;
                    bomblng1 = rps.MESSAGE[0].lng;
                    bombnick1 = rps.MESSAGE[0].nickname;
                }
                if (rps.MESSAGE[1] != null) {
                    bomblat2 = rps.MESSAGE[1].lat;
                    bomblng2 = rps.MESSAGE[1].lng;
                    bombnick2 = rps.MESSAGE[1].nickname;
                }
                if (rps.MESSAGE[2] != null) {
                    bomblat3 = rps.MESSAGE[2].lat;
                    bomblng3 = rps.MESSAGE[2].lng;
                    bombnick3 = rps.MESSAGE[2].nickname;
                }

                if (bombnick1 == nick1) {
                    let marker1 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map1,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers1.push(marker1);
                }
                else if (bombnick1 == nick2) {
                    let marker2 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map2,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers2.push(marker2);
                }
                else if (bombnick1 == nick3) {
                    let marker3 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map3,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers2.push(marker2);
                }

                if (bombnick2 == nick1) {
                    let marker1 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map1,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers1.push(marker1);
                }
                else if (bombnick2 == nick2) {
                    let marker2 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map2,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers2.push(marker2);
                }
                else if (bombnick2 == nick3) {
                    let marker3 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map3,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers2.push(marker2);
                }

                if (bombnick3 == nick1) {
                    let marker1 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map1,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers1.push(marker1);
                }
                else if (bombnick3 == nick2) {
                    let marker2 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map2,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers2.push(marker2);
                }
                else if (bombnick3 == nick3) {
                    let marker3 = new Tmapv3.Marker({
                        position: new Tmapv3.LatLng(bomblat1, bomblng1), //Marker의 중심좌표 설정.
                        map: map3,
                        icon: "../imgs/mapview/acc.png" //마커 디자인
                    });
                    markers2.push(marker2);
                }
            })
    }
        , 3000);
    //목록 갱신
    tableclear = setInterval(function () {
        for (i = 0; i < lengths; i++) {
            $("#ttrr").remove();
        }
    }, 3000)
}
function btnclick2() {
    alert("관리모드를 종료합니다.");
    clearInterval(accimarker);
    clearInterval(tableclear);
}
function btnclick3() {
    window.location.reload();
}
function removeMarkers() {
    for (vari = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}