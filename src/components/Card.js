import React from "react";

const Card = function (props) {
  return (
    <div className='Card'>
      <img src={props.image} alt={props.name}></img>
      <p>{props.name}</p>
    </div>
  );
};

export { Card };
