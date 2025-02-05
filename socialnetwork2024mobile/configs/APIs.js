import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"

const BASE_URL = 'http://192.168.1.219:8000/'

export const endpoints = {
    'categories': '/categories/',
    'topics': '/topics/',
    'posts': (topicId) => `/topics/${topicId}/posts/`,
    'login': '/o/token/',
    'current-user': '/users/current-user/',
    'post-details': (postId) => `/posts/${postId}/`,
    'comments': (postId) => `/posts/${postId}/comments/`,
    'add-comment': (postId) => `/posts/${postId}/comments/`,
    'register': '/users/',
    'reaction-like': (postId) => `/posts/${postId}/likes/`,
    'reaction-haha': (postId) => `/posts/${postId}/hahas/`,
    'reaction-love': (postId) => `/posts/${postId}/loves/`, 
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