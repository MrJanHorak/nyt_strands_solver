//styles
import './PossibleWords.css'


function PossibleWords({ setCurrentWord, possibleWords , boardIndex }) {
  const handleClick = (word) => {
    setCurrentWord(word)
  }

  // only show words that contain the current index
  possibleWords = possibleWords.filter(word => 
    boardIndex === undefined || word.coordinates.some(([x, y]) => x === boardIndex[0] && y === boardIndex[1])
  );


  return (
    <div className='possible-words'>
      Number os words: {possibleWords.length}
      {possibleWords.map((word, index) => (
        <button key={word + index} onClick={() => handleClick(word)}>{word.word}</button>
      ))}
    </div>
  )
}

export default PossibleWords