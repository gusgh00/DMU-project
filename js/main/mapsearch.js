
// 페이지가 로딩이 된 후 호출하는 함수입니다.
var map;
var label;
var markers = [];
var emarkers = [];
var slatlngsear;
var elatlngsear;
var jsonObject;
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
}
//출발지 마커의 옵션을 설정해주는 함수입니다.
function addMarker(lonlatoption) {
    // 마커 생성
    var marker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(lonlatoption.lonlat.latitude(), lonlatoption.lonlat.longitude()), //Marker의 중심좌표 설정.
        map: map, //Marker가 표시될 Map 설정..
        icon: "../imgs/mapview/start.png"
    });
    markers.push(marker);
    marker.on("Click", function (evt) {
        document.getElementById("startPoint").value = lonlatoption.title;
        console.log(lonlatoption.lonlat);
        slatlngsear = {
            slat: lonlatoption.lonlat._lat,
            slng: lonlatoption.lonlat._lng
        }
    });
}
//출발지 특정 장소를 검색하는 함수입니다.
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
//출발지 POI검색
function onComplete() {
    console.log(this._responseData); //json로 데이터를 받은 정보들을 콘솔창에서 확인할 수 있습니다.
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
    map.setCenter(new Tmapv3.LatLng(this._responseData.searchPoiInfo.pois.poi[0].frontLat, this._responseData.searchPoiInfo.pois.poi[0].frontLon));
    map.setZoom(14);
}
//도착지 마커의 옵션을 설정해주는 함수입니다.
function addMarkerE(lonlatoption) {
    // 마커 생성
    var emarker = new Tmapv3.Marker({
        position: new Tmapv3.LatLng(lonlatoption.lonlat.latitude(), lonlatoption.lonlat.longitude()), //Marker의 중심좌표 설정.
        map: map, //Marker가 표시될 Map 설정..
        //title: lonlatoption.title, //마우스 위치시 출력할 타이틀
        icon: "../imgs/mapview/end.png"
    });
    emarkers.push(emarker);
    emarker.on("Click", function (evt) {
        document.getElementById("endPoint").value = lonlatoption.title;
        console.log(lonlatoption.lonlat);
        elatlngsear = {
            elat: lonlatoption.lonlat._lat,
            elng: lonlatoption.lonlat._lng
        }
    });
}
//도착지 특정 장소를 검색하는 함수입니다.
function searchPOIs() {
    var center = map.getCenter();//map의 중심 좌표 값을 받아 옵니다.
    var optionObj = {
        reqCoordType: "WGS84GEO", //요청 좌표계 옵셥 설정입니다.
        resCoordType: "WGS84GEO",  //응답 좌표계 옵셥 설정입니다.
        centerLon: 126.867576,  //POI검색시 중앙좌표의 경도입니다.
        centerLat: 37.500812 //POI검색시 중앙좌표의 위도입니다.
    };
    var params = {
        onComplete: onCompleteE,
        onProgress: onProgress,
        onError: onError
    };
    var tData = new Tmapv3.extension.TData();
    var endPoint = $('#endPoint').val();
    tData.getPOIDataFromSearchJson(encodeURIComponent(endPoint), optionObj, params);//encodeURIComponent함수로 해당 파라메터 값을 처리합니다.
}
//도착지 POI검색
function onCompleteE() {
    console.log(this._responseData); //json로 데이터를 받은 정보들을 콘솔창에서 확인할 수 있습니다.
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
            addMarkerE(lonlatoption);//마커를 추가하는 함수입니다.
        });
    } else {
        alert('검색결과가 없습니다.');
    }
    map.setCenter(new Tmapv3.LatLng(this._responseData.searchPoiInfo.pois.poi[0].frontLat, this._responseData.searchPoiInfo.pois.poi[0].frontLon));
    map.setZoom(14);
}
//경로안내 요청 함수
function getRP() {
    var s_latlng = new Tmapv3.LatLng(slatlngsear.slat, slatlngsear.slng);
    var e_latlng = new Tmapv3.LatLng(elatlngsear.elat, elatlngsear.elng);
    var optionObj = {
        reqCoordType: "WGS84GEO", //요청 좌표계 옵셥 설정입니다.
        resCoordType: "WGS84GEO",  //응답 좌표계 옵셥 설정입니다.
        trafficInfo: "Y",
        searchOption: 12
    };

    var params = {
        onComplete: onCompleteH,
        onProgress: onProgress,
        onError: onError
    };
    // TData 객체 생성
    var tData2 = new Tmapv3.extension.TData();
    // TData 객체의 경로요청 함수
    tData2.getRoutePlanJson(s_latlng, e_latlng, optionObj, params);
    removeMarkers()
    removeMarkersE()
    //중략…
}
//경로안내
function onCompleteH() {
    console.log(this._responseData); //json으로 데이터를 받은 정보들을 콘솔창에서 확인할 수 있습니다.
    jsonObject = new Tmapv3.extension.GeoJSON();
    var jsonForm = jsonObject.rpTrafficRead(this._responseData);
    //교통정보 표출시 생성되는 LineColor 입니다.
    var trafficColors = {
        // 사용자가 임의로 색상을 설정할 수 있습니다.
        // 교통정보 옵션 - 라인색상
        trafficDefaultColor: "#000000", //교통 정보가 없을 때
        trafficType1Color: "#009900", //원할
        trafficType2Color: "#7A8E0A", //서행
        trafficType3Color: "#8E8111",  //정체
        trafficType4Color: "#FF0000" //정체
    };
    jsonObject.drawRouteByTraffic(map, jsonForm, trafficColors);
    map.setCenter(new Tmapv3.LatLng(slatlngsear.slat, slatlngsear.slng));
    map.setZoom(13);
    var resdist = this._responseData.features[0].properties.totalDistance / 1000;
    document.getElementById("whatdistance").innerHTML = resdist.toFixed(2) + "km"
    var TRFlength = this._responseData.features.length;
    var SumTotalTime = this._responseData.features[0].properties.totalTime;
    var Hour = 0;
    var Min = 0;
    var Sec = 0;
    Hour = 4 * SumTotalTime / 3600;
    Min = (Hour - Math.floor(Hour)) * 60;
    Sec = (Min - Math.floor(Min)) * 60;
    //자가용 속력과 시간을 자전거 속력과 시간으로 변환 시키는 코드
    if (Math.floor(Hour) == 0) {
        console.log(Math.floor(Min));
        console.log(Math.floor(Sec));
        document.getElementById("whattime").innerHTML = Math.floor(Min) + "분" + " " + Math.floor(Sec) + "초";
    }
    else if (Math.floor(Hour) != 0) {
        console.log(Math.floor(Hour));
        console.log(Math.floor(Min));
        console.log(Math.floor(Sec));
        document.getElementById("whattime").innerHTML = Math.floor(Hour) + "시간" + " " + Math.floor(Min) + "분" + " " + Math.floor(Sec) + "초";
    }
}
//경로취소
function RoadCancel() {
    var btn_sp = document.getElementById("searchSP");
    var btn_ep = document.getElementById("searchEP");
    var btn_search = document.getElementById("searchLoad");
    var btn_cancel = document.getElementById("searchLoadCancel");
    // btn_sp.disabled = false;
    // btn_sp.style.backgroundColor = '#ff3d7e';
    // btn_sp.style.color = '#ffffff';
    // btn_ep.disabled = false;
    // btn_ep.style.backgroundColor = '#9c35fd';
    // btn_ep.style.color = '#ffffff';
    // btn_search.disabled = false;
    // btn_search.style.backgroundColor = '#88a795';
    // btn_search.style.color = '#ffffff';
    // btn_cancel.disabled = true;
    // btn_cancel.style.backgroundColor = '#4e5c77';
    // btn_cancel.style.color = '#46494f'

    var inputs = document.getElementById("startPoint");
    var inpute = document.getElementById("endPoint");

    document.getElementById("whattime").innerHTML = "-"
    document.getElementById("whatdistance").innerHTML = "-"

    inputs.value = null;
    inpute.value = null;

    slatlngsear = null;
    elatlngsear = null;

    map.destroy(); //지도 삭제
    initTmap(); //지도 불러오기
}
// 모든 마커를 제거하는 함수입니다.
function removeMarkers() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}
// 모든 마커를 제거하는 함수입니다.
function removeMarkersE() {
    for (var i = 0; i < emarkers.length; i++) {
        emarkers[i].setMap(null);
    }
    emarkers = [];
}
//데이터 로드중 실행하는 함수입니다.
function onProgress() {
}
//데이터 로드 중 에러가 발생시 실행하는 함수입니다.
function onError() {
    alert("onError");
}
function enterkey1() {
    if (window.event.keyCode == 13) {
        searchPOI();
    }
}
function enterkey2() {
    if (window.event.keyCode == 13) {
        searchPOIs();
    }
}