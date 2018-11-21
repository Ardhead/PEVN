import * as axios from 'axios';

// upload file
const upload = (formData, apiUrl) => {
    const url = `${apiUrl}/shipments/`;
    return axios.post(url, formData)
        // get data
        .then(x => x.data)
}

// clean shipments database
const clean = (apiUrl) => {
    const url = `${apiUrl}/shipments/`;
    return axios.delete(url)
}

export {
    upload,
    clean
}