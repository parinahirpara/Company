import axios from 'axios';

export async function createCompanyGroup(formData) {
    const response = await axios.post('/api/companygroup', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'compress'
        }
    });
    return await response.data;
}
export async function getAllCompanyGroups() {
    const response = await axios.get("/api/companygroup");
    return await response.data;
}
export async function deleteCurrentGroup(id) {
    const response = await axios.delete('/api/companygroup/' + id);
    return await response.data;
}
export async function updateCurrentCompanyGroup(formData) {
    const response = await axios.post('/api/editcompanygroup', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'compress'
        }
    });
    return await response.data;
}