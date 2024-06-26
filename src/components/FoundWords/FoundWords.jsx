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
          if (!spanGram.includes(word.word)) {
            return (
              <div
                className='found-word'
                key={index}
                onClick={() => handleOnClick(word.word)}
              >
                {word.word}
              </div>
            );
          }
        })}
      </div>
      {spanGram.length > 0 && (
        <div className='span-gram'>
          <h4>Span Gram</h4>
          <div className='span-gram-list'>
            {spanGram.map((word, index) => {
              return (
                <div
                  className='spangram-word'
                  onClick={() => handleOnClick(word)}
                  key={index}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default FoundWords;
