import { useState, useEffect, lazy, Suspense, useContext } from 'react';
//Components
const Header = lazy(() => import('../../components/Header/Header'));
const TodaysTheme = lazy(() =>
  import('../../components/TodaysTheme/TodaysTheme')
);
const CurrentStrandsBoard = lazy(() =>
  import('../../components/CurrentStrandsBoard/CurrentStrandsBoard')
);
const PossibleWords = lazy(() =>
  import('../../components/PossibleWords/PossibleWords')
);
const FoundWords = lazy(() => import('../../components/FoundWords/FoundWords'));

//styles
import './LandingPage.css';

// services
import getStrandsBoardAndClue from '../../services/getCurrentStrandsBoard';

//helper functions
import { findWordsInBoard } from '../../js/allWords';

//Context
import { DictionaryContext } from '../../context/dictionaryContext';

function LandingPage() {
  const { dictionary, dictLoading } = useContext(DictionaryContext);
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
          spanGramWords,
          dictionary
        );
        setPossibleWords(possibleWords);
        setWordsLoading(false);
      }
    };

    fetchPossibleWords();
  }, [currentStrandsBoard, themeWords, spanGramWords, dictionary]);

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
      <Suspense fallback={<div>Loading...</div>}>
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
            {dictLoading || wordsLoading ? (
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
      </Suspense>
    </div>
  );
}

export default LandingPage;
