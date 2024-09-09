import { useEffect } from 'react';
import './FoundWords.css';

function FoundWords({
  FoundWords,
  spanGram,
  handleAddtoSpanGram,
  handleRemoveFromSpanGram,
}) {
  const handleOnClick = (word) => {
    if (spanGram.includes(word)) {
      handleRemoveFromSpanGram(word);
    } else if (spanGram.length > 0) {
      handleRemoveFromSpanGram(spanGram[0]);
      handleAddtoSpanGram(word);
    } else {
      handleAddtoSpanGram(word);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className='found-words'>
      <h4>Found Words {FoundWords.length}</h4>
      <div className='found-word-list'>
        {FoundWords.map((word, index) => {
          return (
            <div
              className='found-word'
              key={index}
              onClick={() => handleOnClick(word.word)}
            >
              {word.word}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FoundWords;
