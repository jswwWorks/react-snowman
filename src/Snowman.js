import React, { useState } from "react";

import "./Snowman.css";
import img0 from "./0.png";
import img1 from "./1.png";
import img2 from "./2.png";
import img3 from "./3.png";
import img4 from "./4.png";
import img5 from "./5.png";
import img6 from "./6.png";

import { randomWord, ENGLISH_WORDS } from './words';

// Questions:

// reset the game -- is there a way to just rerender the component,
// or should we just revert the states (like we did) back to initial states?


// TODO: decompose component (remove unnecessary parts)

// Parts to decompose:
// generateButtons function (make each button its own component and pass in a
// letter)


/** Snowman game: plays hangman-style game with a melting snowman.
 *
 * Props:
 * - maxWrong: how many wrong moves is a player allowed?
 * - images: array of images for wrong guess
 * - words: array of words to pick answer from
 *
 * State:
 * - nWrong: # wrong guesses so far
 * - guessedLetters: set of guessed letters (good and bad) so far
 * - answer: selected secret word*
 */

function Snowman({
      images=[img0, img1, img2, img3, img4, img5, img6],
      words=[randomWord(ENGLISH_WORDS)], // TODO: feed in all the words
      maxWrong=6,
    }) {
  /** by default, allow 6 guesses and use provided gallows images. */

  const maxGuesses = maxWrong;

  const [nWrong, setNWrong] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState(() => new Set());
  const [answer, setAnswer] = useState((words)[0]);
  // TODO: this is where you pull in the random word

  /** resetSnowman: reverts all states to their initial state,
   *  forces page re-render to start game again
   */
  function resetSnowman() {
    setNWrong(0);
    setGuessedLetters(() => new Set()); // only pass in callback functions
    // when we care about what the state was before (we could just say
    // 'new Set()' here and that'd be perfectly good)
    setAnswer(randomWord(ENGLISH_WORDS));
  }

  /** guessedWord: show current-state of word:
   if guessed letters are {a,p,e}, show "app_e" for "apple"
   */
  function guessedWord() {
    return answer
        .split("")
        .map(ltr => (guessedLetters.has(ltr) ? ltr : "_"));
  }

  /** handleGuess: handle a guessed letter:
   - add to guessed letters
   - if not in answer, increase number-wrong guesses
   */
  function handleGuess(evt) {
    let ltr = evt.target.value;

    setGuessedLetters(g => {
      const newGuessed = new Set(g);
      newGuessed.add(ltr);
      return newGuessed;
    });

    setNWrong(n => n + (answer.includes(ltr) ? 0 : 1));
  }

  /** generateButtons: return array of letter buttons to render */
  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button
            className='letter'
            key={ltr}
            value={ltr}
            id={ltr}
            onClick={handleGuess}
            disabled={guessedLetters.has(ltr)}
        >
          {ltr}
        </button>
    ));
  }

  // In-progress decomposition
  // function generateButtons() {
  //   return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
  //     <LetterButton letter={ ltr } disabled={ guessedLetters.has(ltr) } />
  //   ));
  // } // only do that if each button was going to do something way crazy
  // don't make a new element if the html rendering does everything you need
  // in this case, we don't need anymore than what we get with the HTML

  return (
      <div className="Snowman">
        <img src={(images)[nWrong]} alt={nWrong} />
        <p>{`Number of incorrect guesses so far: ${nWrong}`}</p>
        <p className="Snowman-word">{guessedWord()}</p>

        {nWrong !== maxGuesses &&
         <p>{generateButtons()}</p>
        }

      <button onClick={resetSnowman}> Reset </button>

        {nWrong === maxGuesses &&
          <p>{`You lose. Correct word: ${answer}`}</p>
        }
      </div>
  );
}

// add more details to the alt tag -- make it more descriptive
// # guesses left & mention snowman
export default Snowman;
