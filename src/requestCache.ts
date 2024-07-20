export const storeRequest = (request) => {
    const storedRequests = JSON.parse(localStorage.getItem('offlineRequests')) || [];
    storedRequests.push(request);
    localStorage.setItem('offlineRequests', JSON.stringify(storedRequests));
};

export const retrieveRequests = () => {
    return JSON.parse(localStorage.getItem('offlineRequests')) || [];
};

export const clearRequests = () => {
    console.log('clearing all requests')
    localStorage.removeItem('offlineRequests');
};
