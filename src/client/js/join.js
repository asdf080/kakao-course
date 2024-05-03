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
  console.log(response);
};

joinBtn.addEventListener("click", joinFetch);
