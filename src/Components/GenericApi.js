import config from "./Config";

const getHeaders = () => {
    return localStorage.getItem('accessToken')
        ? {
            Authorization: `Token ${localStorage.getItem('accessToken')}`,
            'Content-Type': 'application/json', // Adjust content type if needed
        }
        : {
            'Content-Type': 'application/json', // Adjust content type if needed
        };
};

const genericApiCall = ({ endpoint, method = 'GET', searchTerm = '', headers = {}, body, callback }) => {
    const requestOptions = {
        method: method,
        headers: {
            ...getHeaders(),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    };

    let url = `${config.url}/${endpoint}`;
    if (searchTerm) {
        url += `/?name=${searchTerm}`;
    }

    return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
            if (callback && typeof callback === 'function') {
                callback(data);
            }
        })
        .catch((error) => {
            console.error(`Error in API call: ${error.message}`);
            // Handle the error as needed
        });
};

export const login = (username, password, callback) => {
    genericApiCall({
        endpoint: 'generateToken',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: {
            username: username,
            password: password,
        },
        callback: callback,
    });
};

export default genericApiCall;
