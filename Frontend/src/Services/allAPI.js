import commonAPI from "./commonAPI";
import SERVER_URL from "./serverURL";

export const travelerRegisterAPI = async (reqBody) => {
    return commonAPI("POST", `${SERVER_URL}/api/travelers/register`, reqBody)
}

export const travelerLoginAPI = async (reqBody) => {
    return commonAPI("POST", `${SERVER_URL}/api/travelers/login`, reqBody)
}

export const hostRegisterAPI = async (reqBody, reqHeader) => {
    return commonAPI("POST", `${SERVER_URL}/api/hosts/register`, reqBody, reqHeader)
}

export const hostLoginAPI = async (reqBody) => {
    return commonAPI("POST", `${SERVER_URL}/api/hosts/login`, reqBody)
}

export const getAllExperiences = async (reqHeader) => {
    return commonAPI("GET", `${SERVER_URL}/api/travelers/getAll-experiences`, {}, reqHeader)
}

export const getAnExperience = async (id, reqHeader) => {
    return commonAPI("GET", `${SERVER_URL}/api/travelers/getAn-experience/${id}`, {}, reqHeader)
}

export const getAHost = async (hostId, reqHeader) => {
    return commonAPI("GET", `${SERVER_URL}/api/hosts/getAHost/${hostId}`, {}, reqHeader)
}

export const toggleFavorite = async (experienceId, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/api/travelers/toggle-favorites/${experienceId}`, {}, reqHeader);
};

export const getUserFavorites = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/api/travelers/user-favorites`, {}, reqHeader);
};

export const getAllFavorites = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/api/travelers/getAll-favorites`, {}, reqHeader);
};

export const getHostedExperience = async (hostId, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/api/travelers/get-hostedExp/${hostId}`, {}, reqHeader);
};

export const updateExperience = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/api/travelers/edit-experience/${id}`, reqBody, reqHeader);
}

export const updateHostDetails = async (id, reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVER_URL}/api/hosts/edit-host-details/${id}`, reqBody, reqHeader);
}

export const addAvilability = async (hostId, reqBody, reqHeader) => {
    return await commonAPI("PATCH", `${SERVER_URL}/api/travelers/add-availability/${hostId}`, reqBody, reqHeader)
}

export const getAvailability = async (hostId, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/api/travelers/get-availability/${hostId}`, {}, reqHeader);
};