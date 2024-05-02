const API_URL = import.meta.env.VITE_API_URL;

const getStrandsBoardAndClue = async () => {
  const response = await fetch(`${API_URL}/data`);
  const data = await response.json();
  return data;
}

export default getStrandsBoardAndClue