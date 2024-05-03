const API_URL = import.meta.env.VITE_API_URL;

const getStrandsBoardAndClue = async () => {
  const response = await fetch(`${API_URL}`);
  console.log(response);
  const data = await response.json();
  return data;
}

export default getStrandsBoardAndClue