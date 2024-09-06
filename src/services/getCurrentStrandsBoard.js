const API_URL = import.meta.env.VITE_API_URL;

const getStrandsBoardAndClue = async () => {
  // Get the client's timezone
  const clientTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Append the timezone as a query parameter to the API URL
  const urlWithTimezone = `${API_URL}?timezone=${encodeURIComponent(
    clientTimezone
  )}`;

  const response = await fetch(urlWithTimezone);
  const data = await response.json();
  return data;
};

export default getStrandsBoardAndClue;
