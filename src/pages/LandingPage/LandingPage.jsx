import { useState, useEffect } from 'react';
//Components
import Header from '../../components/Header/Header';
import TodaysTheme from '../../components/TodaysTheme/TodaysTheme';
import CurrentStrandsBoard from '../../components/CurrentStrandsBoard/CurrentStrandsBoard';

//styles
import './LandingPage.css';

// services
import getStrandsBoardAndClue from '../../services/getCurrentStrandsBoard';

function LandingPage() {
  const [currentStrandsBoard, setCurrentStrandsBoard] = useState([]);
  const [clue, setClue] = useState('');

  useEffect(() => {
    getStrandsBoardAndClue().then((data) => {
      setCurrentStrandsBoard(data.buttonValues);
      setClue(data.clue);
    });
  }, []);

  return (
    <div className='solver-container'>
      <Header />
      <TodaysTheme clue={clue} />
      <CurrentStrandsBoard currentStrands={currentStrandsBoard} />
      {/* <PossibleWords /> */}
    </div>
  );
}

export default LandingPage;
