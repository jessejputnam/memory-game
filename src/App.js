import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./styles/App.css";
import { Card } from "./components/Card";

// ############################# Reused Functions ################################

const getRandomNums = (total) => {
  const nums = [];

  for (let i = 0; i < 12; i++) {
    let randomNum = Math.floor(Math.random() * total);

    while (nums.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * total);
    }

    nums.push(randomNum);
  }

  return nums;
};

const getMonsters = async function () {
  const res = await fetch(
    "https://botw-compendium.herokuapp.com/api/v2/category/monsters"
  );
  const allMonsters = await res.json();
  const numMonsters = allMonsters.data.length;
  const randomNumsArr = getRandomNums(numMonsters);
  return randomNumsArr.map((num) => allMonsters.data[num]);
};

// ############################# Component ################################

const App = function () {
  const [monsters, setMonsters] = useState([]);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [guessed, setGuessed] = useState([]);

  const loadMonsters = async () => {
    const response = await getMonsters();

    setMonsters(response);
  };

  const handleClick = function (e) {
    if (!guessed.includes(e.target.alt)) {
      // Add Guess to array
      setGuessed([...guessed, e.target.alt]);

      // Iterate score
      setScore(score + 1);

      // Shuffle monsters
      const arrCopy = monsters.slice();
      const shuffledArr = arrCopy.sort((a, b) => 0.5 - Math.random());
      setMonsters(shuffledArr);
    } else {
      // Set new best if larger
      if (score > best) setBest(score);

      // Reset score and board
      setScore(0);
      loadMonsters();
    }
  };

  // Component did mount cycle
  useEffect(() => {
    loadMonsters();
  }, []);

  return (
    <div className='App'>
      <header>
        <div className='app__header'>
          <h1>Memory of the Wild</h1>
          <p>
            <strong>Directions: </strong>Click on images you have not already
            clicked. Each click will get a point. Game will continue until you
            click an already chosen image.
          </p>
        </div>
        <div className='scoreboard'>
          <div className='scoreboard__row'>
            <p>Score:</p>
            <p>{score}</p>
          </div>
          <div className='scoreboard__row'>
            <p>Best:</p>
            <p>{best}</p>
          </div>
        </div>
      </header>

      <div className='gameboard'>
        {monsters.map((monster) => (
          <Card
            key={uniqid()}
            image={monster.image}
            name={monster.name}
            handleClick={handleClick}
          ></Card>
        ))}
      </div>
    </div>
  );
};

export default App;
