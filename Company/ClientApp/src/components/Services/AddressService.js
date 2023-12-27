import axios from 'axios';

export async function createAddress(formData) {
    const response = await axios.post('/api/address', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'compress'
        }
    });
    return await response.data;
}
export async function getAllAddress(type, id) {
    const response = await axios.get("/api/address?type="+type+"&&id="+ id);
    return await response.data;
}
export async function deleteCurrentAddress(id) {
    debugger;
    const response = await axios.delete('/api/address/' + id);
    return await response.data;
}
export async function updateCurrentAddress(formData) {
    const response = await axios.post('/api/editaddress', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'compress'
        }
    });
    return await response.data;
}