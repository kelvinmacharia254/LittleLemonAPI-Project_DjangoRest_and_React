const HOST = import.meta.env.VITE_API_URL;
export const fetchInfo = async () => {
    const response = await fetch(`${HOST}/test_endpoint`,
        {
            // method: 'POST',
        });
    const resData = await response.json();

    if (!response.ok) {
        const error = new Error(response.statusText);
        error.status = response.status;
        console.error(error);
        throw error
    }

    return resData;
};
