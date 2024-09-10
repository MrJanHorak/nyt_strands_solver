import { useEffect } from 'react';
import App from './App';
import './App.css';

const setInitialTheme = () => {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
};

const Root = () => {
  useEffect(() => {
    setInitialTheme();
  }, []);

  return <App />;
};

export default Root;