import { useState, useEffect } from 'react';
import './App.css';

import {fetchInfo} from "./http.js";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetch() {
      try {
        const response = await fetchInfo();
        setData(response);
        setError('');

      } catch (error) {
        console.error('Error fetching:',`${error.message} : ${error.status}`);
        setError('Could not fetch data from server');
      }
    }

    fetch()

  }, []);

  return (
    <>
      <p>Message: {data?.message}</p>
      <p>{error}</p>
    </>
  );
}

export default App;
