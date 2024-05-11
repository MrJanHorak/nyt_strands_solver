import { useState, useEffect } from 'react';
//Components
import Header from '../../components/Header/Header';
import TodaysTheme from '../../components/TodaysTheme/TodaysTheme';
import CurrentStrandsBoard from '../../components/CurrentStrandsBoard/CurrentStrandsBoard';
import PossibleWords from '../../components/PossibleWords/PossibleWords';

//styles
import './LandingPage.css';

// services
import getStrandsBoardAndClue from '../../services/getCurrentStrandsBoard';

//helper functions
import { findWordsInBoard } from '../../js/allWords';

function LandingPage() {
  const [currentStrandsBoard, setCurrentStrandsBoard] = useState([]);
  const [clue, setClue] = useState('');
  const [possibleWords, setPossibleWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [boardIndex, setBoardIndex] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [clickCounter, setClickCounter] = useState(0);

  useEffect(() => {
    getStrandsBoardAndClue().then((data) => {
      setCurrentStrandsBoard(data.buttonValues);
      setClue(data.clue);
    });
  }, []);

  useEffect(() => {
    if (currentStrandsBoard.length > 0) {
      const possibleWords = findWordsInBoard(currentStrandsBoard);
      setPossibleWords(possibleWords);
    }
  }, [currentStrandsBoard, currentWord]);

  const foundAWord = (word) => {
    const foundWordsCopy = [...foundWords];
    const wordIndex = foundWordsCopy.findIndex(
      (foundWord) => JSON.stringify(foundWord) === JSON.stringify(word)
    );
    if (wordIndex !== -1) {
      foundWordsCopy.splice(wordIndex, 1);
    } else {
      foundWordsCopy.push(word);
    }
    setFoundWords(foundWordsCopy);
  };

  return (
    <div className='solver-container'>
      <Header />
      <TodaysTheme clue={clue} />
      <div className='board-words-container'>
        <CurrentStrandsBoard
          currentStrands={currentStrandsBoard}
          setBoardIndex={setBoardIndex}
          currentWord={currentWord}
          setCurrentWord={setCurrentWord}
          setSelectedLetter={setSelectedLetter}
          foundWords={foundWords}
          setClickCounter={setClickCounter}
        />
        <PossibleWords
          possibleWords={possibleWords}
          setCurrentWord={setCurrentWord}
          boardIndex={boardIndex}
          currentWord={currentWord}
          selectedLetter={selectedLetter}
          foundAWord={foundAWord}
          foundWords={foundWords}
          clickCounter={clickCounter}
          setClickCounter={setClickCounter}
        />
      </div>
    </div>
  );
}

export default LandingPage;
