import { useEffect } from 'react';
import './CurrentStrandsBoard.css';


function CurrentStrandsBoard({currentStrands, setBoardIndex}) {

  const handleSelect = (e, rowIndex, columnIndex) => {
    e.preventDefault();
    setBoardIndex([rowIndex, columnIndex]);
  };

  useEffect(() => {
    console.log('CurrentStrandsBoard useEffect');
  }, [currentStrands]);

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
                      className='strand'
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
