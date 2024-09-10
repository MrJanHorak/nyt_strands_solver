import { useState, useEffect } from 'react';

//Components
import Header from '../../components/Header/Header';
import TodaysTheme from '../../components/TodaysTheme/TodaysTheme';
import CurrentStrandsBoard from '../../components/CurrentStrandsBoard/CurrentStrandsBoard';
import PossibleWords from '../../components/PossibleWords/PossibleWords';
import FoundWords from '../../components/FoundWords/FoundWords';
import InstructionsModal from '../../components/InstructionsModal/InstructionsModal';


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
  const [spanGram, setSpanGram] = useState([]);
  const [loading, setLoading] = useState(true);
  const [themeWords, setThemeWords] = useState([]);
  const [spanGramWords, setSpanGramWords] = useState([]);
  const [wordsLoading, setWordsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getStrandsBoardAndClue();
        setCurrentStrandsBoard(data.buttonValues);
        setThemeWords(data.themeWords);
        setSpanGramWords(data.spangram);
        setClue(data.clue);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPossibleWords = async () => {
      if (currentStrandsBoard.length > 0 && spanGramWords.length > 0) {
        const possibleWords = await findWordsInBoard(
          currentStrandsBoard,
          themeWords,
          spanGramWords
        );
        setPossibleWords(possibleWords);
        setWordsLoading(false);
      }
    };

    fetchPossibleWords();
  }, [currentStrandsBoard, themeWords, spanGramWords]);

  const handleAddtoSpanGram = (word) => {
    setSpanGram([word]);
  };

  const handleRemoveFromSpanGram = (word) => {
    setSpanGram(spanGram.filter((w) => w !== word));
  };

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
      <InstructionsModal isOpen={isModalOpen} onClose={closeModal} />
        <Header openModal={openModal} />
      {loading && <div className='loading-container'>Loading...</div>}
      {!loading && (
        <>
          <TodaysTheme clue={clue} />
          <CurrentStrandsBoard
            currentStrands={currentStrandsBoard}
            setBoardIndex={setBoardIndex}
            currentWord={currentWord}
            setCurrentWord={setCurrentWord}
            setSelectedLetter={setSelectedLetter}
            foundWords={foundWords}
            setClickCounter={setClickCounter}
            spanGram={spanGram}
          />
          <FoundWords
            FoundWords={foundWords}
            spanGram={spanGram}
            handleAddtoSpanGram={handleAddtoSpanGram}
            handleRemoveFromSpanGram={handleRemoveFromSpanGram}
          />
          {wordsLoading ? (
            <div className='loading-container'>Finding possible words!</div>
          ) : (
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
              spanGram={spanGram}
            />
          )}
        </>
      )}
    </div>
  );
}

export default LandingPage;
