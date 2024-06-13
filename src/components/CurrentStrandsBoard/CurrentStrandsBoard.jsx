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

  useEffect(() => {}, [currentStrands, currentWord]);

  return (
    <>
      <div style={{ position: 'relative' }}>
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
                                  ([x, y]) =>
                                    x === rowIndex && y === columnIndex
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
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          {foundWords?.map((word, index) => (
            <polyline
              key={index}
              points={word.coordinates
                .map(
                  ([y, x]) =>
                    `${x * 50 + 53 / 2 - 1.5 * 51},${y * 50 + 70 / 2}`
                )
                .join(' ')}
              style={{ fill: 'none', stroke: '#aedfee', strokeWidth: '9px' }}
            />
          ))}
        </svg>
      </div>
    </>
  );
}

export default CurrentStrandsBoard;
