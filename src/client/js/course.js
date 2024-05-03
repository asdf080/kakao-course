const locationMap = document.getElementById("location-map");

let map;
let userLatitude;
let userLongitude;
let isMapDrawn = false;
let courseData = [];
let markers = [];
let clickCourse; //0은 현재위치, 나머지는 id(1번부터)

const panTo = (lati, long) => {
  const position = new kakao.maps.LatLng(lati, long);
  map.panTo(position);
};

const clickCourseList = (e, courseNo) => {
  if (clickCourse !== courseNo) {
    const courseWrap = document.querySelectorAll(".course");
    courseWrap.forEach((cw) => cw.classList.remove("on"));
    e.currentTarget.classList.add("on");

    let courseLati, courseLong;

    if (courseNo === 0) {
      courseLati = userLatitude;
      courseLong = userLongitude;
    } else {
      const matchCourse = courseData.find((c) => c.course_no === courseNo);
      courseLati = matchCourse.course_latitude;
      courseLong = matchCourse.course_longitude;
    }
    panTo(courseLati, courseLong);
  }
};

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
  // 방문시 마커
  if (course.user_courses_no) {
    markerImageUrl = "/file/map_complete.jpg";
    markerImageSize = new kakao.maps.Size(24, 35);
  }
  const kakaoMakerImage = new kakao.maps.MarkerImage(markerImageUrl, markerImageSize);
  const latlng = new kakao.maps.LatLng(course.course_latitude, course.course_longitude);
  new kakao.maps.Marker({
    map: map,
    position: latlng,
    title: course.course_name,
    image: kakaoMakerImage,
  });
};

const drawMap = (latitude, longitude) => {
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
      delMarker();
      userLatitude = pos.coords.latitude;
      userLongitude = pos.coords.longitude;

      // 지도가 없으면 지도 생성
      if (!isMapDrawn) {
        // 지도 그리기
        drawMap(userLatitude, userLongitude);
        // 마커 추가
        courseData.forEach((c) => addCourseMarker(c));
        isMapDrawn = true;
      }
      addMarker(new kakao.maps.LatLng(userLatitude, userLongitude));
    });
  }
};

const makeCourseNaviHTML = (data) => {
  const courseWrap = document.getElementById("courseWrap");
  let html = "";
  data.forEach((data) => {
    html += `<li class="course" onclick="clickCourseList(event, ${data.course_no})">`;
    if (data.user_courses_no) {
      html += `<div class="mark-wrap"><img src="/file/badge.png"/></div>`;
    }
    html += `<p>${data.course_name}</p></li>`;
  });
  html += `<li id="myPosition" class="course on" onclick="clickCourseList(event, 0)">나의 위치</li>`;
  courseWrap.innerHTML = html;
};

// 코스데이터 불러오기
const getCourseList = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch("/api/course", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const result = await response.json();
  courseData = result.data;
  makeCourseNaviHTML(courseData);
  configLocation();
};
getCourseList();
