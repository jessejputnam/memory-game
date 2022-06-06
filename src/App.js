import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import "./styles/App.css";
import { Card } from "./components/Card";

// import poke1 from "./images/pikachu.jpeg";

// Reused Functions
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

const App = function () {
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    const loadMonsters = async () => {
      const response = await getMonsters();

      setMonsters(response);
    };

    loadMonsters();
  }, []);

  return (
    <div className='App'>
      {monsters.map((monster) => (
        <Card key={uniqid()} image={monster.image} name={monster.name}></Card>
      ))}
    </div>
  );
};

export default App;
