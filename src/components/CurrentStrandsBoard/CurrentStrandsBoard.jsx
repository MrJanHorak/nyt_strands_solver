import { useEffect } from 'react';
import './CurrentStrandsBoard.css';

const handleSelect = (e, rowIndex, columnIndex) => {
  e.preventDefault();
  console.log(rowIndex, columnIndex);
};

function CurrentStrandsBoard({currentStrands}) {

  console.log(currentStrands);

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
