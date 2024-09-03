import { useState,useEffect } from 'react'

import './App.css'

const HOST = import.meta.env.VITE_API_URL
function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        console.log(HOST)

        async function fetchInfo(){
            try {
                const response = await fetch(`${HOST}/users`, {})

                if (!response.ok) {
                    throw Error(`${response.status} : ${response.statusText}`)
                }

                const data = await response.json()
                console.log(data)
                setData(data)

            }catch(error){
                console.log('Error fetching: ', error)
            }
        }
        fetchInfo()

    }, []);
    return (
    <>
        <p>Message: {data.message}</p>
    </>
  )
}

export default App
