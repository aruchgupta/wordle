import React, { useState, useEffect, useCallback } from "react";
import Tile from "./Tile";
import { WORD_LENGTH } from "../data";
const regex = new RegExp("^[a-z]$");

const Row = ({ solution, dictionary }) => {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(new Array(6).fill(""));
  const [isFinal, setIsFinal] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [totalAttempts, setTotalAttempts] = useState(1);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isGameOver) {
        const value = e.key;

        if (value === "Backspace") {
          setGuess((prev) => {
            const val = prev?.slice(0, -1);
            return val || "";
          });
          return;
        }

        if (value === "Enter") {
          if (guess.length !== WORD_LENGTH) {
            return;
          }

          if (dictionary.indexOf(guess.toUpperCase()) === -1) {
            alert("Not a valid word");
            return;
          }

          let a = totalAttempts;
          a++;
          setTotalAttempts(a);

          const newAttempts = [...attempts];
          newAttempts[attempts.findIndex((val) => val === "")] = guess;

          setAttempts(newAttempts);
          setGuess("");
          setIsFinal(true);

          if (guess === solution || totalAttempts === 6) {
            setIsGameOver(true);
            console.log(totalAttempts);
            totalAttempts === 6
              ? alert(solution?.toUpperCase())
              : alert("Yay!");
          }
          return;
        }

        if (!value.match(regex)) {
          return;
        }

        if (guess.match)
          if (guess.length >= WORD_LENGTH) {
            return;
          }

        setGuess((prev) => {
          return prev + value;
        });
      }
    },
    [guess, attempts, solution, isGameOver, totalAttempts]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {[...attempts]?.map((attempt, index) => {
        const emptyIndex = attempts.findIndex((val) => val === "");
        const currentWord =
          emptyIndex === index
            ? guess.padEnd(5) || new Array(5).fill("")
            : attempt || new Array(5).fill("");
        return (
          <div className="row" key={index}>
            {
              <Tile
                currentWord={currentWord}
                isCurrent={index < emptyIndex || emptyIndex === -1}
                solution={solution}
                isFinal={isFinal}
              />
            }
          </div>
        );
      })}
    </>
  );
};

export default Row;
