//styles
import { useEffect } from 'react';
import './PossibleWords.css';

function PossibleWords({
  setCurrentWord,
  possibleWords,
  boardIndex,
  currentWord,
}) {
  const handleClick = (word) => {
    setCurrentWord(word);
  };

  // only show words that contain the current index
  possibleWords = possibleWords.filter(
    (word) =>
      boardIndex === undefined ||
      word.coordinates.some(
        ([x, y]) => x === boardIndex[0] && y === boardIndex[1]
      )
  );

  useEffect(() => {
    console.log(currentWord);
  }, [currentWord]);

  return (
    <div className='possible-words'>
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
      <div className='total'>Total: {possibleWords.length}</div>
    </div>
  );
}

export default PossibleWords;
