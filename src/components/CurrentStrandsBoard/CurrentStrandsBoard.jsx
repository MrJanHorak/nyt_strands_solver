import { useEffect } from 'react';
import './CurrentStrandsBoard.css';

function CurrentStrandsBoard({
  currentStrands,
  setBoardIndex,
  currentWord,
  setCurrentWord,
  setSelectedLetter,
  foundWords,
  setClickCounter,
}) {
  const handleSelect = (e, rowIndex, columnIndex) => {
    e.preventDefault();
    setBoardIndex([rowIndex, columnIndex]);
    setSelectedLetter(currentStrands[rowIndex][columnIndex]);
    setCurrentWord(null);
    setClickCounter(0);
  };

  useEffect(() => {
    console.log('CurrentStrandsBoard useEffect');
  }, [currentStrands, currentWord]);

  return (
    <>
      <div className='current-strands-board'>
        <div className='current-strands'>
          {currentStrands.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className='row'>
                {row.map((strand, columnIndex) => {
                  return (
                    <div
                      key={`${rowIndex}, ${columnIndex}`}
                      className={`strand ${
                        currentWord?.coordinates.some(
                          ([x, y]) => x === rowIndex && y === columnIndex
                        )
                          ? 'highlighted'
                          : foundWords.some((word) =>
                              word.coordinates.some(
                                ([x, y]) => x === rowIndex && y === columnIndex
                              )
                            )
                          ? 'found'
                          : ''
                      }`}
                      onClick={(e) => handleSelect(e, rowIndex, columnIndex)}
                    >
                      {strand}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default CurrentStrandsBoard;
