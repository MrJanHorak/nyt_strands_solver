import './TodaysTheme.css';

function TodaysTheme({ clue }) {
  return (
    <div className='theme-container'>
      <div className='theme-container-header'>TODAY&apos;S THEME</div>
      <div className='theme'>{clue}</div>
    </div>
  );
}

export default TodaysTheme;
