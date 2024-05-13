import './FoundWords.css';

function FoundWords({ FoundWords }) {
  return (
    <div className='found-words'>
      <h4>Found Words {FoundWords.length}</h4>
      <div className="found-word-list">
        {FoundWords.map((word, index) => {
          return <div className='found-word' key={index}>{word.word}</div>;
        })}
    </div>
    </div>
  );
}

export default FoundWords;
