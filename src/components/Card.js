import React from "react";

const Card = function (props) {
  const formattedName = props.name
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className='Card' onClick={props.handleClick}>
      <img
        className='card__img'
        src={props.image}
        alt={props.name}
        width='250px'
      ></img>
      <p>{formattedName}</p>
    </div>
  );
};

export { Card };
