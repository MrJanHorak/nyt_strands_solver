import { IoIosCloseCircleOutline } from 'react-icons/io';
import './InstructionsModal.css';

function InstructionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay' onClick={onClose}>
      <div className='modal-content'>
      <IoIosCloseCircleOutline />
        <h2>How to Use the Strands Helper</h2>
        <ol>
          <li>
            Select any letter on the board to see all possible words associated
            with that letter.
          </li>
          <li>
            Select a word from the word list to see an outline around each
            letter of the word on the board.
          </li>
          <li>
            Try that word on the NYT Strands game, if it is one of the words for
            the strands game, click on it again to highlight the letters blue
            and lock out all words that use any of those letters.
          </li>
          <li>
            If the word you found is the spangram, select it on the found words
            list to high light it yellow.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default InstructionModal;
