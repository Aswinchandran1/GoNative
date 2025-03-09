import axios from "axios";

const commonAPI = async (httpMethod, url, reqBody = {}, reqHeader = { "Content-Type": "application/json" }) => {
    try {
        const response = await axios({
            method: httpMethod,
            url,
            data: reqBody,
            headers: reqHeader
        });
        return response; 
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error.response?.data || { message: "Something went wrong!" }; 
    }
};

export default commonAPI;
