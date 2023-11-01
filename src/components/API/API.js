import Axios from './Axios';

async function getUserData(data){
    try {
        let result = await Axios.get(`/user/find-email`, data)
        return result;
    } catch (error) {
        return error;
    }
}

export {
    getUserData
}