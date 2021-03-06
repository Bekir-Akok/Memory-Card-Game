import React, { useState } from "react";
import Card from "../Card/Card";
import GameOver from "../GameOver/GameOver";


const GameBoard = () => {
  const cards = [
    "troll-1",
    "troll-1",
    "troll-2",
    "troll-2",
    "troll-3",
    "troll-3",
    "troll-4",
    "troll-4",
    "troll-5",
    "troll-5",
    "troll-6",
    "troll-6",
  ];


  const shuffle = array => {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };


  const [cardList, setCardList] = useState(
    shuffle(cards).map((name, index) => {
      return {
        id: index,
        name: name,
        flipped: false,
        matched: false
      };
    })
  );

  const [flippedCards, setFlippedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);


  const handleClick = (name, index) => {
    let currentCard = {
      name,
      index
    };

    let updateCards = cardList.map(card => {
      if (card.id === index) {
        card.flipped = true;
      }
      return card;
    });
    let updateFlipped = flippedCards;
    updateFlipped.push(currentCard);
    setFlippedCards(updateFlipped);
    setCardList(updateCards);

    
    if (flippedCards.length === 2) {
      setTimeout(() => {
        check();
      }, 750);
    }
  };

  const check = () => {
    let updateCards = cardList;
    if (
      flippedCards[0].name === flippedCards[1].name &&
      flippedCards[0].index !== flippedCards[1].index
    ) {
      updateCards[flippedCards[0].index].matched = true;
      updateCards[flippedCards[1].index].matched = true;
      isGameOver();
    } else {
      updateCards[flippedCards[0].index].flipped = false;
      updateCards[flippedCards[1].index].flipped = false;
    }
    setCardList(updateCards);
    setFlippedCards([]);
  };

  const isGameOver = () => {
    let done = true;
    cardList.forEach(card => {
      if (!card.matched) done = false;
    });
    setGameOver(done);
  };


  const restartGame = () => {
    setCardList(
      shuffle(cards).map((name, index) => {
        return {
          id: index,
          name: name,
          flipped: false,
          matched: false
        };
      })
    );

    setFlippedCards([]);
    setGameOver(false);
  };

  return (
    <>
    <h1 className="title">Troll Face ????</h1>
    <div className="game-board">
      {!gameOver &&
        cardList.map((card, index) => (
          <Card
            key={index}
            id={index}
            name={card.name}
            flipped={card.flipped}
            matched={card.matched}
            clicked={flippedCards.length === 2 ? () => {} : handleClick}
          />
        ))}
      {gameOver && <GameOver restartGame={restartGame} />}
    </div>
    </>
  );
};

export default GameBoard;
