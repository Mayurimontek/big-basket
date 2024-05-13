import axios from 'axios';
const URL = "https://freeapi.gerasim.in/api/BigBasket/";

const getData = async (endpoint) => {
    try {
        const result = await axios.get(`${URL}${endpoint}`);
        return result.data.data;
    } catch (error) {
        alert(error)
    }
}
const postData =async(endpoint,obj)=>{
    try {
        debugger
       const result = await axios.post(`${URL}${endpoint}`,obj);
       return result.data; 
    } catch (error) {
        alert(error);
    }
}
const getDataById=async(endpoint)=>{
    try {
        
        const result = await axios.get(`${URL}${endpoint}`);
        return result.data.data;
    } catch (error) {
        alert(error);
    }
}
export{getData,postData,getDataById}