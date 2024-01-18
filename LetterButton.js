import Snowman from "./Snowman";

// IN-PROGRESS

/** Generates a button for a given letter.
 *
 * Props:
 *  letter, a string of a lowercase English letter
 *  disabled, a boolean
 *
 * States: none
 *
 * What it renders: A button for a letter in the Snowman game
 *
 * App -> Snowman -> LetterButton
 *
 */
function LetterButton({ letter, disabled }) {
  return (
    <button
    className='letter'
    key={letter}
    value={letter}
    id={letter}
    onClick={handleGuess} // would this work?
    disabled={disabled}>
    {letter}
    </button>
  );
}

// disabled={guessedLetters.has(ltr)}
// would this work? or should it be what
// we have here