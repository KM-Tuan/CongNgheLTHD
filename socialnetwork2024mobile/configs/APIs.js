import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const BASE_URL = 'http://192.168.1.16:8000/'

export const endpoints = {
    'categories': '/categories/',
    'topics': '/topics/',
    'posts': (topicId) => `/topics/${topicId}/posts/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/'
}

export const authApis = async () => {
    const token = await AsyncStorage.getItem('token');
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});