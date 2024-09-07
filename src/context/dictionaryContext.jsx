import { createContext, useState, useEffect } from 'react';

// Function to dynamically load the dictionary
const loadDictionary = async () => {
  const dictionary = await import('../data/words_dictionary_300000_words.json');
  return dictionary.default;
};

export const DictionaryContext = createContext();

export const DictionaryProvider = ({ children }) => {
  const [dictionary, setDictionary] = useState(null);
  const [dictLoading, setDictLoading] = useState(true);

  useEffect(() => {
    const fetchDictionary = async () => {
      const dict = await loadDictionary();
      setDictionary(dict);
      setDictLoading(false);
    };

    fetchDictionary();
  }, []);

  return (
    <DictionaryContext.Provider value={{ dictionary, dictLoading }}>
      {children}
    </DictionaryContext.Provider>
  );
};
