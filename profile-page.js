const changeAvatarButton = document.querySelector(".divBut");
const imgAvatar = document.querySelector(".cardAvatar");
imgAvatar.addEventListener("mouseover", () => {
    changeAvatarButton.classList.remove("hide");
});
imgAvatar.addEventListener("mouseout", () => {
    changeAvatarButton.classList.add("hide");
});

const now = new Date();
const time = document.getElementById("time");
time.innerHTML = "Current time: " + now.toString();