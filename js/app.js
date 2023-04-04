const cardsBg = [
  "cat1",
  "cat2",
  "cat3",
  "cat4",
  "cat5",
  "cat6",
  "cat7",
  "cat8",
  "cat9",
  "cat1",
  "cat2",
  "cat3",
  "cat4",
  "cat5",
  "cat6",
  "cat7",
  "cat8",
  "cat9",
];
const scroll = (window.onload = () => {
  window.scrollBy(100, 100);
});

let cardsEls = document.querySelectorAll(".game-card");
cardsEls = [...cardsEls];

const gameStartTime = new Date().getTime();
let clickedCard = "";
const clickedCardsArr = [];

const pairs = cardsEls.length / 2;
let result = 0;

function onClick() {
  clickedCard = this;
  if (clickedCard == clickedCardsArr[0]) return;

  clickedCard.style.background = "";
  if (clickedCardsArr.length === 0) {
    clickedCardsArr[0] = clickedCard;
    return;
  } else {
    cardsEls.forEach((card) => card.removeEventListener("click", onClick));
    clickedCardsArr[1] = clickedCard;
    setTimeout(function () {
      if (clickedCardsArr[0].className === clickedCardsArr[1].className) {
        clickedCardsArr.forEach((card) => card.classList.add("visible"));
        result++;
        cardsEls = cardsEls.filter(
          (card) => !card.classList.contains("visible")
        );
        if (result === 1) {
          const gameEndTime = new Date().getTime();
          const gameFullTime = (gameEndTime - gameStartTime) / 1000;
          const cardsParent = document.querySelector(".game-cards-container");
          cardsParent.style.filter = "blur(5px)";
          document.body.classList.add("active");
          document.querySelector(
            ".modal-box"
          ).textContent += `Your game time is: ${gameFullTime} sec.`;
          document
            .querySelector(".play-again")
            .addEventListener("click", playAgain);
          function playAgain() {
            location.reload();
          }

          // setTimeout(function () {
          //   alert(`Your game time is: ${gameFullTime}sec.`);
          //   location.reload();
          // }, 600);
        }
      } else {
        clickedCardsArr.forEach((card) => (card.style.background = "black"));
      }
      clickedCard = "";
      clickedCardsArr.length = 0;
      cardsEls.forEach((card) => card.addEventListener("click", onClick));
    }, 500);
  }
}

const init = () => {
  cardsEls.forEach((card) => {
    const cardIndex = Math.floor(Math.random() * cardsBg.length);
    card.classList.add(cardsBg[cardIndex]);
    cardsBg.splice(cardIndex, 1);
  });

  setTimeout(() => {
    cardsEls.forEach((card) => {
      card.style.background = "black";

      card.addEventListener("click", onClick);
    });
  }, 2000);
};
init();
