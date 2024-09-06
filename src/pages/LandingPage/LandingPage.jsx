import { useState, useEffect } from 'react';
//Components
import Header from '../../components/Header/Header';
import TodaysTheme from '../../components/TodaysTheme/TodaysTheme';
import CurrentStrandsBoard from '../../components/CurrentStrandsBoard/CurrentStrandsBoard';
import PossibleWords from '../../components/PossibleWords/PossibleWords';
import FoundWords from '../../components/FoundWords/FoundWords';

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

  useEffect(() => {
    getStrandsBoardAndClue().then((data) => {
      setCurrentStrandsBoard(data.buttonValues);
      setThemeWords(data.themeWords);
      setSpanGramWords(data.spangram);
      setClue(data.clue);
      setLoading(false);
    });
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
      }
    };

    fetchPossibleWords();
  }, [currentStrandsBoard, spanGramWords, themeWords]);

  const handleAddtoSpanGram = (word) => {
    setSpanGram([...spanGram, word]);
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
      <Header />
      {loading && <div className='loading-container'>Loading...</div>}
      {!loading && (
        <>
          <TodaysTheme clue={clue} />
          {/* <div className='board-words-container'> */}
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
          {/* </div> */}
          <FoundWords
            FoundWords={foundWords}
            spanGram={spanGram}
            handleAddtoSpanGram={handleAddtoSpanGram}
            handleRemoveFromSpanGram={handleRemoveFromSpanGram}
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
            spanGram={spanGram}
          />
        </>
      )}
    </div>
  );
}

export default LandingPage;
