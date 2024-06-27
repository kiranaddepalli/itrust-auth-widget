import axiosInstance from "./AxiosInstance";

// Find All CredentialSchema
export const findCredentialSchemas = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/credential_schemas");
        if(response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
};

// Find CredentialSchema By ID
export const findCredentialSchemaById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/credential_schemas/${id}`);
        if(response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

// Find Credential Schema by code and Version 
export const findCredentialSchemaByCodeAndVersion = async (code, version) => {
    try {
        const response = await axiosInstance.get(`/api/v1/credential_schemas/code/${code}/version/${version}`);
        if(response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}



