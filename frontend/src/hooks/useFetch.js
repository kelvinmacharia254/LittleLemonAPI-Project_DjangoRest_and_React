import {useEffect, useState} from "react";

export function useFetch(fetchFn, initialValue){
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(()=>{
        async function fetchData(){
            setIsFetching(true)
            try{
                const testBackEndData = await fetchFn();
                setFetchedData(testBackEndData);
            } catch (error) {
                setError(error);
            }
            setIsFetching(false)
        }
        fetchData();
    },[fetchFn])

    return{
        error,
        isFetching,
        fetchedData,
        setFetchedData
    }
}