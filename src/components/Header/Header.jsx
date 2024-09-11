import { GoQuestion } from 'react-icons/go';
import './Header.css';

function Header({ openModal }) {
  return (
    <div className='header'>
      <h3>Strands Helper</h3>
      <GoQuestion className='question-icon' onClick={openModal} />
    </div>
  );
}

export default Header;
