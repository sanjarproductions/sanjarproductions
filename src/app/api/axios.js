import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.notion.com/v1",
    // baseURL: "https://jsonplaceholder.typicode.com/",
})

export default instance