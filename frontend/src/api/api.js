import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const singupUser = async (email, password) =>{
    try {
        const response = await API.post("/signup", {"email": email, "password": password})
        return response.data;
    } catch (error)
    {
        throw error.response ? error.response.data : "Something went wrong!";
    }
};

export const loginUser = async (email, password) => {
    try{
        const response = await API.post("/login", {"email": email, "password": password})
        return response.data;
    }catch (error)
    {
        throw error.response ? error.response.data : "Something went wrong!";
    }

}

export const profileUser = async (token) => {
    try{
        const response = await API.get("/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }catch (error)
    {
        throw error.response ? error.response.data : "Something went wrong!";
    }
}