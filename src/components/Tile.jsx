import React from "react";

const Tile = ({ currentWord, isCurrent, solution, isFinal }) => {
  return (
    <>
      {[...currentWord]?.map((letter, index) => {
        let classes = "tile";
        if (isFinal && isCurrent) {
          if (letter === solution[index]) {
            classes += " correct";
          } else if (letter && solution.includes(letter)) {
            classes += " close";
          } else {
            classes += " incorrect";
          }
        }
        return (
          <div className={classes} key={index}>
            {letter}
          </div>
        );
      })}
    </>
  );
};

export default Tile;
