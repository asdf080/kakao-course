const userIdInput = document.querySelector("#userId");
const userPWInput = document.querySelector("#userPassword");
const joinBtn = document.querySelector(".join");
const loginBtn = document.querySelector(".login");
joinBtn.addEventListener("click", () => (window.location.href = "/join"));

const loginFetch = async () => {
  const userId = userIdInput.value;
  const userPW = userPWInput.value;

  if (!userId || !userPW) {
    msgAlert("bottom", "값을 입력해주세요.", "error");
    return;
  }

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId,
      userPW,
    }),
  });
  const result = await response.json();
  if (result.status === "success") {
    localStorage.setItem("accessToken", result.data.accessToken);
    msgAlert("center", "로그인이 완료되었습니다.", "success");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  } else msgAlert("bottom", "로그인에 실패했습니다.", "error");
};

loginBtn.addEventListener("click", loginFetch);

const checkError = () => {
  const notFoundAccessTokenError = getParameterByName("error");
  if (notFoundAccessTokenError == "not_found_access_token") {
    msgAlert("bottom", "인증에 실패하였습니다.", "error");
  } else if (notFoundAccessTokenError == "need_login") {
    msgAlert("bottom", "로그인이 필요합니다.", "error");
  }
  const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
};
checkError();
