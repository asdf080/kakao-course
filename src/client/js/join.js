const userIdInput = document.querySelector("#userId");
const userPWInput = document.querySelector("#userPassword");
const userNameInput = document.querySelector("#userName");
const joinBtn = document.querySelector("#joinBtn");

const joinFetch = async () => {
  const userId = userIdInput.value;
  const userPW = userPWInput.value;
  const userName = userNameInput.value;

  if (!userId || !userPW || !userName) {
    msgAlert("bottom", "값을 입력해주세요.", "error");
    return;
  }
  const response = await fetch("/api/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      userId,
      userName,
      userPW,
    }),
  });
  const data = await response.json();
  if (data.status === "success") {
    msgAlert("bottom", "회원가입이 완료되었습니다.", "success");
    setTimeout(() => (window.location.href = "/login"), 1000);
  } else {
    msgAlert("bottom", "회원가입에 실패했습니다.", "error");
  }
};

joinBtn.addEventListener("click", joinFetch);
