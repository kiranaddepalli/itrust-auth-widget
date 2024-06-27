// Services for the user 
import axiosInstance from "./AxiosInstance";

// Gets the Digital Address with the private Id Guid
export const findDigitalAddressByGUID = async (guid) => {
    try {
        const response = await axiosInstance.get(`/api/v1/digital_address/privateid/${guid}`);
        if(response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

// Get Credential Metadata 
export const findCredentialMetadata = async (data) => {
    try {
        const response = await axiosInstance.post(`/api/v1/credential_metadata/search`, data);
        if(response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        //console.log ('response', response)
        return response.data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

// Get the Credential by Credential Id
export const findCredentialByCredentialId = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/v1/credentials/${id}`);
        if(response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}

// Get the metadata with the private Id Guid
export const findMetadataByPrivateIdGuid = async (guid) => {
    try {
        const response = await axiosInstance.get(`/api/v1/digital_address/privateid/${guid}/metadata`);
        if(response.status !== 200) {
            throw new Error("Network response was not ok");
        }
        return response.data.data;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
        throw error;
    }
}