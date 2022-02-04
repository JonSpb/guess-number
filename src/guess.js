import { useState, useEffect } from "react";

function Guess() {
  const [number, setNumber] = useState(0);
  const [value, setValue] = useState("");
  const [counter, setCounter] = useState(0);
  const [result, setResult] = useState("—");
  const [win, setWin] = useState(false);
  const [block, setBlock] = useState(true);

  useEffect(() => {
    if (win === false) {
      fetch("https://number.ymatuhin.workers.dev/")
        .then((response) => response.json())
        .then((json) => {
          setNumber(json.number);
        });
    }
  }, [win]);

  function condition() {
    const valueNum = Number(value);
    if (valueNum === number) {
      setResult(`Угадал за ${counter} ходов`);
      setCounter(counter + 1);
      setWin(true);
    } else if (valueNum < number) {
      setResult("Больше");
      setCounter(counter + 1);
      setValue("");
    } else if (valueNum > number) {
      setResult("Меньше");
      setCounter(counter + 1);
      setValue("");
    }
  }

  function onSetValue(inputValue) {
    setValue(inputValue);
    const condCheck = Number(inputValue);
    setBlock(isNaN(condCheck) || condCheck < 1 || condCheck > 100);
  }

  function conditionReset() {
    setResult("—");
    setCounter(0);
    setWin(false);
    setValue("");
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="header__title">Угадай число</h1>
        <p className="header__condition">
          Я загадал число от 1 до 100, ты <br /> должен угадать это число
        </p>
      </div>

      {!win && (
        <>
          <form className="main" onSubmit={(event) => event.preventDefault()}>
            <input
              type="text"
              inputMode="numeric"
              min="1"
              max="100"
              className="main__input"
              value={value}
              onChange={(event) => onSetValue(event.target.value)}
            />
            <button
              className="main__button"
              onClick={condition}
              disabled={block}>
              Угадать
            </button>
          </form>
          <div className="result">
            <p className="result__text"> {result} </p>
            <p className="result__text__all">Сыграно игр: {counter}</p>
          </div>
        </>
      )}

      {win && (
        <form className="win" onSubmit={(event) => event.preventDefault()}>
          <p className="win__result__text"> Угадал за {counter} ходов</p>
          <button className="win__return__button" onClick={conditionReset}>
            Начать сначала
          </button>
          <p className="win__text__all">Сыграно игр: {counter}</p>
        </form>
      )}
    </div>
  );
}

export default Guess;
