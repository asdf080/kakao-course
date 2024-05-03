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
  console.log(response);
};

loginBtn.addEventListener("click", loginFetch);
