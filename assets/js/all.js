"use strict";

var countries = document.querySelector('#countries');
var cyties = document.querySelector('#cyties');
var gpsIcon = document.querySelector('#gpsIcon');
var menuIcon = document.querySelector('#menuIcon'); //地圖初始化

var map = L.map("map", {
  center: [24.994579, 121.311088],
  zoom: 8
});
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
axios.get("https://3000.gov.tw/hpgapi-openmap/api/getPostData").then(function (res) {
  //處理自動定位
  function getGPS() {
    if (navigator.geolocation) {
      // 成功
      var showPosition = function showPosition(position) {
        map.setView([position.coords.latitude, position.coords.longitude], 15);
      }; // 失敗


      var showError = function showError() {
        alert('抱歉，現在無法取的您的地理位置。');
      };

      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert('抱歉，您的裝置不支援定位功能。');
    }
  }

  getGPS();
  gpsIcon.addEventListener('click', getGPS, false); // 處理地圖

  var data = res.data;
  var markers = new L.MarkerClusterGroup().addTo(map);
  data.forEach(function (item) {
    //判斷標點顏色
    var iconColor = function () {
      if (item.total !== 0) {
        return new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      } else {
        return new L.Icon({
          iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41]
        });
      }
    }(); //群組標點.增加圖層(leaflet的標點([座標])).增加popup


    markers.addLayer(L.marker([item.latitude, item.longitude], {
      icon: iconColor
    }).bindPopup("<div>\n                <h4 class=\"m-0 mb-2 bold\">".concat(item.storeNm, "</h4>\n                <p class=\"m-0 mb-2 h5 text-danger\"><span class=\"bold\">\u4E09\u500D\u5238\u5EAB\u5B58\u91CF\uFF1A</span>").concat(item.total, "</p>\n                <a target=\"_blank\" href=\"https://www.google.com.tw/maps/place/").concat(item.addr, "\" class=\"m-0 mb-2 h6 text-dark underLine\"><span class=\"bold\">\u5730\u5740\uFF1A</span>").concat(item.addr, "</a>                <p class=\"m-0 mb-2 h6\"><span class=\"bold\">\u96FB\u8A71\uFF1A</span>").concat(item.tel, "</p>\n                <p class=\"m-0 mb-2 h6\"><span class=\"bold\">\u71DF\u696D\u6642\u9593\uFF1A</span>").concat(item.busiTime, "</p>\n                <p class=\"m-0 mb-2 h6\"><span class=\"bold\">\u6578\u64DA\u66F4\u65B0\u6642\u9593\uFF1A</span>").concat(item.updateTime, "</p>\n                </div>")));
  });
  map.addLayer(markers); //選取地區後的資料顯示

  countries.addEventListener('change', function () {
    var content = '';
    var str = '';
    data.forEach(function (item) {
      if (item.hsnNm == countries.value && item.townNm == cyties.value) {
        content = "<li> <div class=\"card p-2 mb-2\">\n                <h4 class=\"btn btn-primary m-0 mb-2 bold\">".concat(item.storeNm, "</h4>\n                <p class=\"m-0 mb-2 h5 text-danger\"><span class=\"bold\">\u4E09\u500D\u5238\u5EAB\u5B58\u91CF\uFF1A</span>").concat(item.total, "</p>\n                <a target=\"_blank\" href=\"https://www.google.com.tw/maps/place/").concat(item.addr, "\" class=\"m-0 mb-2 h6 text-dark underLine\"><span class=\"bold\">\u5730\u5740\uFF1A</span>").concat(item.addr, "</a>\n                <p class=\"m-0 mb-2 h6\"><span class=\"bold\">\u96FB\u8A71\uFF1A</span>").concat(item.tel, "</p>\n                <p class=\"m-0 mb-2 h6\"><span class=\"bold\">\u71DF\u696D\u6642\u9593\uFF1A</span>").concat(item.busiTime, "</p>\n                </div> </li>");
        str += content;
      }
    });
    list.innerHTML = str;
  });
  cyties.addEventListener('change', function () {
    var content = '';
    var str = '';
    data.forEach(function (item) {
      if (item.hsnNm == countries.value && item.townNm == cyties.value) {
        content = "<li> <div class=\"card p-1 mb-2\">\n                <h4 class=\"btn btn-primary m-0 mb-2 bold\">".concat(item.storeNm, "</h4>\n                <p class=\"m-0 mb-2 h5 text-danger\"><span class=\"bold\">\u4E09\u500D\u5238\u5EAB\u5B58\u91CF\uFF1A</span>").concat(item.total, "</p>\n                <a target=\"_blank\" href=\"https://www.google.com.tw/maps/place/").concat(item.addr, "\" class=\"m-0 mb-2 h6 text-dark underLine\"><span class=\"bold\">\u5730\u5740\uFF1A</span>").concat(item.addr, "</a>\n                <p class=\"m-0 mb-2 h6\"><span class=\"bold\">\u96FB\u8A71\uFF1A</span>").concat(item.tel, "</p>\n                <p class=\"m-0 mb-2 h6\"><span class=\"bold\">\u71DF\u696D\u6642\u9593\uFF1A</span>").concat(item.busiTime, "</p>\n                </div> </li>");
        str += content;
      }
    });
    list.innerHTML = str;
  }); //點擊郵局標題移動位置

  list.addEventListener('click', function (e) {
    if (e.target.tagName == 'H4') {
      // console.log(e.target.innerText);
      data.forEach(function (item) {
        if (item.storeNm == e.target.innerText) {
          map.setView([item.latitude, item.longitude], 16);
        }
      });
      $('.navBar').toggleClass('show');
    }
  }, false);
})["catch"](function (error) {
  alert(error);
}); //製作縣市下拉選單

axios.get('https://raw.githubusercontent.com/Feitoengineer19/mask-map/master/CityCountyData.json').then(function (res) {
  var geoData = res.data;
  var countriesOptions = '';
  var cytiesOptions = '';
  countriesOptions = "<option value=\"\" selected disabled>\u8ACB\u9078\u64C7\u7E23\u5E02</option>";
  geoData.forEach(function (item, index) {
    countriesOptions += "<option value=\"".concat(item.CityName, "\">").concat(item.CityName, "</option>"); // console.log(item.AreaList.forEach(item => {
    //     console.log(item.AreaName);
    // }));
  });
  countries.innerHTML = "<select name=\"\" id=\"countries\">".concat(countriesOptions, "</select>");
  countries.addEventListener('change', function () {
    cytiesOptions = '';
    cytiesOptions = "<option value=\"\" selected disabled>\u8ACB\u9078\u64C7</option>";
    geoData[countries.selectedIndex - 1].AreaList.forEach(function (item) {
      // console.log(item.AreaName);
      cytiesOptions += "<option value=\"".concat(item.AreaName, "\">").concat(item.AreaName, "</option>");
    });
    cyties.innerHTML = "<select name=\"\" id=\"countries\">".concat(cytiesOptions, "</select>");
  });
}); //nav收合

$('#menuIcon').click(function (e) {
  $('.navBar').toggleClass('show');
});
$('#clearIcon').click(function (e) {
  $('.navBar').toggleClass('show');
});
//# sourceMappingURL=all.js.map
