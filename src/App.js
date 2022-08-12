import "./styles.css";
import wordleData from "./data";
import Row from "./components/Row";

export default function App() {
  const dictionary = wordleData;

  const getRandomWord = () => {
    return dictionary[Math.floor(Math.random() * dictionary.length)];
  };

  const solution = getRandomWord();

  return (
    <div className="App">
      <h1>Wordle</h1>
      <div className="mainContainer">
        <Row solution={solution.toLowerCase()} />
      </div>
    </div>
  );
}
