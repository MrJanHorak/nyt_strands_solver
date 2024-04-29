import './CurrentStrandsBoard.css';

//Data
import { currentStrands } from '../../data/currentStrands';

const handleSelect = (e, rowIndex, columnIndex) => {
  e.preventDefault();
  console.log(rowIndex, columnIndex);
};

function CurrentStrandsBoard() {
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
