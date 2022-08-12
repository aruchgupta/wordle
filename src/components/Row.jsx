import React, { useState, useEffect, useCallback } from "react";
import Tile from "./Tile";
import { WORD_LENGTH } from "../data";
const regex = new RegExp("^[a-z]$");

const Row = ({ solution }) => {
  const [guess, setGuess] = useState("");
  const [attempts, setAttempts] = useState(new Array(6).fill(""));
  const [isFinal, setIsFinal] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isGameOver) {
        const value = e.key;

        if (value === "Backspace") {
          setGuess((prev) => {
            const val = prev?.slice(0, -1);
            console.log(val, prev);
            return val || "";
          });
          return;
        }

        if (value === "Enter") {
          if (guess.length !== WORD_LENGTH) {
            return;
          }

          const newAttempts = [...attempts];
          newAttempts[attempts.findIndex((val) => val === "")] = guess;

          setAttempts(newAttempts);
          setGuess("");
          setIsFinal(true);
          console.log(guess, solution);
          if (guess === solution) {
            setIsGameOver(true);
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
    [guess, attempts, solution, isGameOver]
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
