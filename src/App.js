import React, { useState } from "react";
import "./App.css";

export default function App() {
 
  const [userGuess, setUserGuess] = useState(""); // User's current guess
  const [userCount, setUserCount] = useState(0); // Number of rounds played
  const [userAllGuessesVal, setuserAllGuessesVal] = useState([]); // Array to store all the user's guesses
  const [randomNum, setRandomNum] = useState(Math.floor(Math.random() * 100) + 1); // Random number to be guessed
  const [disabled, setDisabled] = useState(false); // Flag to disable input and submit button after game ends
  const [lowHighMsg, setLowHighMsg] = useState(""); // Message indicating whether the guess is too high or too low
  const [msg, setMsg] = useState(""); // Message to show the result of the game (Congrats, Game Over, etc.)
  const [outOfRange, setOutOfRange] = useState();

  //  for updating the userGuess state as the user types in the input field
  const handlerValueChange = (e) => {
    const userInput = e.target.value;
    const numberInput = parseInt(userInput, 10)// input to integer

    if (numberInput < 1 || numberInput > 100)  {
      // If the input is out of range, show the error message and reset the userGuess state
      setOutOfRange("Number out of range (1-100)");
      setUserGuess("");
    } 
      else{
      setUserGuess(userInput);
      setOutOfRange(null); // Clear the outOfRange message
    }
      console.log(userInput)
  };

  const submitHandler = () => {
    console.log(typeof userGuess)
    if (Number(randomNum) === Number(userGuess)) {
      setMsg("Congrats :)"); // User guessed the correct number
      setDisabled(true); // Disable input and submit button
      setLowHighMsg(""); // Clear the lowHighMsg
    } else if (userCount === 10) {
      setMsg("Game Over :("); // User reached the maximum number of rounds allowed
      setDisabled(true); // Disable input and submit button
      setLowHighMsg(""); // Clear the lowHighMsg
    }  else if ( userGuess === ""){
      console.log(userGuess)
      setOutOfRange("Please enter a number!")
      setUserGuess("")
    } 
    else {
      setMsg("Oh no! You guessed it wrong..."); // Users guess is incorrect

      if (randomNum < userGuess) {
        setLowHighMsg("You should go LOWER!"); // Users guess is higher than the random number
      }
      if (randomNum > userGuess) {
        setLowHighMsg("You should go HIGHER!"); // Users guess is lower than the random number
      }

      setUserCount(userCount + 1); // Increment the number of rounds played
      setuserAllGuessesVal([...userAllGuessesVal, userGuess]); // Add the users current guess to the array of all guesses
  
      if (!outOfRange) {
        setUserCount(userCount + 1); // Increment the number of rounds played
        setuserAllGuessesVal([...userAllGuessesVal, userGuess]); // Add the user's current guess to the array of all guesses
      } 

    }

    
  }

  //  for restarting the game after it has ended
  const restartGame = () => {
    setDisabled(false); // Enable input and submit button
    setMsg(""); // Clear the result message
    setuserAllGuessesVal([]); // Clear the array of all guesses
    setUserCount(0); // Reset the number of rounds played
    setRandomNum(Math.floor(Math.random() * 100) + 1); // Generate a new random number
    setUserGuess(""); // Clear the user's current guess
    setLowHighMsg(""); // Clear the lowHighMsg
  };

  return (
    <div className="game">
      <h1 className="title">Guess The Number</h1>
      <h3 className="subtitle">I am thinking a number between 1 and 100...Can you guess it?</h3>

      {/* Input field to allow the user to enter their guess */}
      <input
        className="input"
        disabled={disabled}
        value={userGuess}
        type="number"
        onChange={handlerValueChange}
      />

      {/* Button to submit the user's guess */}
      <button className="btn" disabled={disabled} onClick={submitHandler}>
        submit
      </button>

      {/* Button to restart the game after it ends */}
      {disabled && (
        <button className="btn" onClick={restartGame}>
          Start Again
        </button>
      )}

      {/* Display the result message, low/high message, number of rounds played, and all the user's guesses */}
      <div>
        <p className="msg">{msg}</p>
        <p className="lowOrhigh">{lowHighMsg}</p>
        <p className="totalCount">Rounds: {userCount}</p>
        <p className="guesses">
          Your Guesses:
          {userAllGuessesVal?.map((item, index) => {
            return <span key={index}> {" "} {item}, {}</span>;
          })}
        </p>
      </div>
      
      {/* Display the out-of-range message if it exists */}
      {outOfRange && (
        <div>
          <h4 className="range">{outOfRange}</h4>
        </div>
      )}
    </div>
  );
}
