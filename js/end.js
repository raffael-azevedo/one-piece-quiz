const username = document.getElementById("usr");
const saveScoreButton = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
  saveScoreButton.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();
};
