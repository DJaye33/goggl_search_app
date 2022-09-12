import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl = "https://google-search3.p.rapidapi.com/api/v1";

export const ResultContextProvider = ({ children }) => {
  const [result, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (type) => {
    setIsLoading(true);

    const response = await fetch(`${baseUrl}${type}`, {
      method: "GET",
      headers: {
        "X-User-Agent": "desktop",
        "X-Proxy-Location": "EU",
        "X-RapidAPI-Key": "7cf6e051dbmsh3a04ed5ce084d99p134fa5jsn0f01cc0a654a",
        "X-RapidAPI-Host": "google-search3.p.rapidapi.com",
      },
    });

    const data = await response.json();

    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, result, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
