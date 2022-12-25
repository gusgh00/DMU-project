
var map;
var label;
var markers = [];
var ddrimarkers = [];
var parkmarkers = [];
var convimarkers = [];
var accimarkers = [];
var slatlngsear;
// 페이지가 로딩이 된 후 호출하는 함수입니다.
function initTmap() {
    // map 생성
    // Tmap.map을 이용하여, 지도가 들어갈 div, 넓이, 높이를 설정합니다.
    map = new Tmapv3.Map("map_div", {
        center: new Tmapv3.LatLng(37.500812, 126.867576),
        width: "100%",  // 지도의 넓이
        height: "100%", // 지도의 높이
        zoom: 16   // 지도 줌레벨
    });
};
//사고 다발 지역
$(document).ready(function () {
    $("#ch1").change(function () {
        if ($("#ch1").is(":checked")) { //체크박스가 체크 되었을 때
            fetch("../json/acci.json") //fetch 함수를 통한 json 파싱
                .then(response => {
                    return response.json();
                })
                .then(acci => {
                    for (var i = 0; i < acci.acci.length; i++) {
                        var accilat = acci.acci[i].lat; //배열의 위도 값
                        var accilon = acci.acci[i].lon; //배열의 경도 값
                        var accimarker = new Tmapv3.Marker({
                            position: new Tmapv3.LatLng(accilat, accilon), //Marker의 중심좌표 설정.
                            map: map,
                            label: acci.acci[i].count,
                            icon: "../imgs/mapview/acc.png" //마커 디자인
                        });
                        accimarkers.push(accimarker);
                    }
                });
        } else { //체크박스가 체크 안되어 있을 때
            removeacciMarkers(); //마커 제거
        }
    });
});

//따릉이
$(document).ready(function () {
    $("#ch2").change(function () {
        if ($("#ch2").is(":checked")) { //체크박스가 체크 되었을 때
            fetch("../json/ddri4.json") //fetch 함수를 통한 json 파싱
                .then(response => {
                    return response.json();
                })
                .then(ddri => {
                    console.log(ddri);
                    for (var i = 0; i < ddri.ddri.length; i++) {
                        var ddrilat = ddri.ddri[i].lat; //배열의 위도 값
                        var ddrilon = ddri.ddri[i].lon; //배열의 경도 값
                        var ddrimarker = new Tmapv3.Marker({
                            position: new Tmapv3.LatLng(ddrilat, ddrilon), //Marker의 중심좌표 설정.
                            map: map,
                            label: ddri.ddri[i].name,
                            icon: "../imgs/mapview/ddr.png" //마커 디자인
                        });
                        ddrimarkers.push(ddrimarker);
                    }
                });
        } else { //체크박스가 체크 안되어 있을 때
            removeddriMarkers(); //마커 제거
        }
    });
});

//주차장
$(document).ready(function () {
    $("#ch3").change(function () {
        if ($("#ch3").is(":checked")) { //체크박스가 체크 되었을 때
            fetch("../json/parking.json") //fetch 함수를 통한 json 파싱
                .then(response => {
                    return response.json();
                })
                .then(park => {
                    for (var i = 0; i < park.park.length; i++) {
                        var parklat = park.park[i].lat; //배열의 위도 값
                        var parklon = park.park[i].lon; //배열의 경도 값
                        var parkmarker = new Tmapv3.Marker({
                            position: new Tmapv3.LatLng(parklat, parklon), //Marker의 중심좌표 설정.
                            map: map,
                            icon: "../imgs/mapview/park.png" //마커 디자인
                        });
                        parkmarkers.push(parkmarker);
                    }
                });

            fetch("../json/park_gygi.json") //fetch 함수를 통한 json 파싱
                .then(response => {
                    return response.json();
                })
                .then(park => {
                    for (var i = 0; i < park.park.length; i++) {
                        var parklat = park.park[i].lat; //배열의 위도 값
                        var parklon = park.park[i].lon; //배열의 경도 값
                        var parkmarker = new Tmapv3.Marker({
                            position: new Tmapv3.LatLng(parklat, parklon), //Marker의 중심좌표 설정.
                            map: map,
                            icon: "../imgs/mapview/park.png" //마커 디자인
                        });
                        parkmarkers.push(parkmarker);
                    }
                });
        } else { //체크박스가 체크 안되어 있을 때
            removeparkMarkers(); //마커 제거
        }
    });
});

//정비소
$(document).ready(function () {
    $("#ch4").change(function () {
        if ($("#ch4").is(":checked")) { //체크박스가 체크 되었을 때
            fetch("../json/convi.json") //fetch 함수를 통한 json 파싱
                .then(response => {
                    return response.json();
                })
                .then(convi => {
                    for (var i = 0; i < convi.convi.length; i++) {
                        var convilat = convi.convi[i].lat; //배열의 위도 값
                        var convilon = convi.convi[i].lon; //배열의 경도 값
                        var convimarker = new Tmapv3.Marker({
                            position: new Tmapv3.LatLng(convilat, convilon), //Marker의 중심좌표 설정.
                            map: map,
                            label: convi.convi[i].label,
                            icon: "../imgs/mapview/pix.png" //마커 디자인
                        });
                        convimarkers.push(convimarker);
                    }
                });
        } else { //체크박스가 체크 안되어 있을 때
            removeconviMarkers(); //마커 제거
        }
    });
});


function addMarker(lonlatoption) {
    // 마커 생성
    var marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(lonlatoption.lonlat.latitude(), lonlatoption.lonlat.longitude()), //Marker의 중심좌표 설정.
        map: map, //Marker가 표시될 Map 설정..
    });
    markers.push(marker);
    marker.on("Click", function (evt) {
        document.getElementById("startPoint").value = lonlatoption.title;
        slatlngsear = {
            slat: lonlatoption.lonlat._lat,
            slng: lonlatoption.lonlat._lng
        }
        // removeMarkers()
    });
}
function searchPOI() {
    var center = map.getCenter();//map의 중심 좌표 값을 받아 옵니다.
    var optionObj = {
        reqCoordType: "WGS84GEO", //요청 좌표계 옵셥 설정입니다.
        resCoordType: "WGS84GEO",  //응답 좌표계 옵셥 설정입니다.
        centerLon: 126.867576,  //POI검색시 중앙좌표의 경도입니다.
        centerLat: 37.500812 //POI검색시 중앙좌표의 위도입니다.
    };
    var params = {
        onComplete: onComplete,
        onProgress: onProgress,
        onError: onError
    };
    var tData = new Tmapv3.extension.TData();
    var startPoint = $('#startPoint').val();
    tData.getPOIDataFromSearchJson(encodeURIComponent(startPoint), optionObj, params);//encodeURIComponent함수로 해당 파라메터 값을 처리합니다.
}
function onComplete() {
    if (this._responseData.searchPoiInfo.pois.poi != '') {
        jQuery(this._responseData.searchPoiInfo.pois.poi).each(function () {//결과를 each문으로 돌려 마커를 등록합니다.
            //response 데이터중 원하는 값을 find 함수로 찾습니다.
            var name = this.name;
            var id = this.id;
            var lon = this.frontLon;
            var lat = this.frontLat;
            var lonlatoption = {
                title: name,//마커 라벨 text 설정
                lonlat: new Tmapv3.LatLng(lat, lon)//마커 라벨 좌표 설정
            };
            addMarker(lonlatoption);//마커를 추가하는 함수입니다.
        });
    } else {
        alert('검색결과가 없습니다.');
    }
    removeMarkers();
    map.setCenter(new Tmapv3.LatLng(this._responseData.searchPoiInfo.pois.poi[0].frontLat, this._responseData.searchPoiInfo.pois.poi[0].frontLon));
    map.setZoom(16);
}
// 각 마커 제거하는 함수
function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}
function removeddriMarkers() {
    for (var i = 0; i < ddrimarkers.length; i++) {
        ddrimarkers[i].setMap(null);
    }
    ddrimarkers = [];
}
function removeacciMarkers() {
    for (var i = 0; i < accimarkers.length; i++) {
        accimarkers[i].setMap(null);
    }
    accimarkers = [];
}
function removeparkMarkers() {
    for (var i = 0; i < parkmarkers.length; i++) {
        parkmarkers[i].setMap(null);
    }
    parkmarkers = [];
}
function removeconviMarkers() {
    for (var i = 0; i < convimarkers.length; i++) {
        convimarkers[i].setMap(null);
    }
    convimarkers = [];
}

//데이터 로드중 실행
function onProgress() {
}
//데이터 로드 중 에러 발생
function onError() {
    alert("onError");
}
//input 타입에 엔터키 반응
function enterkey() {
    if (window.event.keyCode == 13) {
        searchPOI();
    }
}