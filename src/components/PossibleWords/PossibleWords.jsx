//styles
import { useEffect, useState } from 'react';
import './PossibleWords.css';

function PossibleWords({
  setCurrentWord,
  possibleWords,
  boardIndex,
  currentWord,
  selectedLetter,
  foundAWord,
  foundWords,
}) {
  const [clickCounter, setClickCounter] = useState(0);

  const handleClick = (word) => {
    switch (clickCounter) {
      case 0:
        setClickCounter(1);
        setCurrentWord(word);
        break;
      case 1:
        if (word.word.startsWith(currentWord.word)) {
          setClickCounter(2);
          foundAWord(word);
        } else if (word.word !== currentWord.word) {
          setCurrentWord(word);
        }
        break;
      case 2:
        setClickCounter(0);
        setCurrentWord(null);
        break;
      default:
        break;
    }
  };
  // only show words that contain the current index
  possibleWords = possibleWords.filter(
    (word) =>
      (boardIndex === undefined ||
        word.coordinates.some(
          ([x, y]) => x === boardIndex[0] && y === boardIndex[1]
        )) &&
      (foundWords.some((foundWord) => foundWord.word === word.word) ||
        !foundWords.some((foundWord) =>
          foundWord.coordinates.some(([x, y]) =>
            word.coordinates.some(([x2, y2]) => x === x2 && y === y2)
          )
        ))
  );

  useEffect(() => {
    console.log(currentWord);
  }, [currentWord]);

  return (
    <div className='possible-words'>
      {selectedLetter && (
        <div className='total'>
          {possibleWords.length} words contain the letter: {selectedLetter}
        </div>
      )}
      <div className='words-container'>
        {possibleWords.map((word, index) => (
          <div
            className={`possible-word ${
              currentWord && currentWord.word === word.word
                ? 'current-word'
                : ''
            }`}
            key={word.word + index}
            onClick={() => handleClick(word)}
          >
            {word.word.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PossibleWords;
