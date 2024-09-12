import { useState, useEffect } from 'react';
import './App.css';

import {fetchInfo} from "./http.js";
import {useFetch} from "./hooks/useFetch.js";

function App() {
  const {
        error,
        isFetching,
        fetchedData,
        setFetchedData
  } = useFetch(fetchInfo, {})

  return (
    <>
      <p>Message: {fetchedData.message}</p>
      {error && <p>{error.statusText}</p>}
    </>
  );
}

export default App;
