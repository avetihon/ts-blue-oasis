const parseData = (response: any) => response.json();

const handleError = (error: Error): Promise<any> => {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
};


export {
    parseData,
    handleError
}
