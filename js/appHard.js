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
scroll();
const cardsParent = document.getElementById("game-cards-container");
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
        if (result === pairs) {
          const gameEndTime = new Date().getTime();
          const gameFullTime = (gameEndTime - gameStartTime) / 1000;
          alert(gameFullTime);
        }
      } else {
        clickedCardsArr.forEach((card) => (card.style.background = "black"));
      }
      clickedCard = "";
      clickedCardsArr.length = 0;
      cardsEls.forEach((card) => card.addEventListener("click", onClick));
    }, 1000);
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
