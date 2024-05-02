const locationMap = document.getElementById("location-map");

let map;
let userLatitude;
let userLongitude;
let isMapDrawn = false;
let courseData = [];
let markers = [];

// 마커 생성
const addMarker = (position) => {
  let marker = new kakao.maps.Marker({
    position: position,
  });
  marker.setMap(map);
  markers.push(marker);
};
// 마커 제거
const delMarker = () => {
  markers.forEach((m) => m.setMap(null));
  markers = [];
};

const addCourseMarker = (course) => {
  let markerImageUrl = "/file/map_not_done.png";
  let markerImageSize = new kakao.maps.Size(24, 35);
  // 미방문시 마커
  const kakaoMakerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize);
  const latlng = new kakao.maps.LatLng(course.course_latitude, course.course_longitude);
  new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: course.course_name,
    image: kakaoMakerImage,
  });
  // 방문시 마커
};

const setCourseMarker = () => {
  courseData.forEach((c) => addCourseMarker(c));
};

const drawMap = (latitude, longitude) => {
  // 1번째 인자: 지도 그림 DOM (HTML) . 지도 그리기
  map = new kakao.maps.Map(locationMap, {
    center: new kakao.maps.LatLng(latitude, longitude),
    level: 3,
  });
  // map.setZoomable(false);
};

const configLocation = () => {
  if (navigator.geolocation) {
    // web api
    navigator.geolocation.watchPosition((pos) => {
      userLatitude = pos.coords.latitude;
      userLongitude = pos.coords.longitude;

      if (!isMapDrawn) {
        // 지도그리기
        drawMap(userLatitude, userLongitude);
        // 2.마커 그리기
        setCourseMarker();

        // 변수값 변경
        isMapDrawn = true;
      }
      addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    });
  }
};

const makeCourseNaviHTML = (data) => {
  const courseWrap = document.getElementById("courseWrap");
  let html = "";
  for (let i = 0; i < data.length; i++) {
    html += `<li class="course">`;
    html += `<p>${data[i].course_name}</p>`;
    html += `</li>`;
  }
  html += `<li id="myPosition" class="course on">나의 위치</li>`;
  courseWrap.innerHTML = html;
};

// 코스데이터 불러오는 fetch함수
const getCourseList = async () => {
  const response = await fetch("/api/course");
  const result = await response.json();
  courseData = result.data;
  makeCourseNaviHTML(courseData);
  configLocation();
};
getCourseList();
