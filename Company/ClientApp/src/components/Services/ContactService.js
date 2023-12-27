import axios from 'axios';

export async function createContact(formData) {
    const response = await axios.post('/api/contact', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'compress'
        }
    });
    return await response.data;
}
export async function getAllContact(type, id) {
    const response = await axios.get("/api/contact?type=" + type + "&&id=" + id);
    return await response.data;
}
export async function deleteCurrentContact(id) {
    const response = await axios.delete('/api/contact/' + id);
    return await response.data;
}
export async function updateCurrentContact(formData) {
    debugger
    const response = await axios.post('/api/editcontact', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'compress'
        }
    });
    return await response.data;
}