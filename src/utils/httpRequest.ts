import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ResponseResult } from '../types/httpTypes';

// Axios instance
const httpRequest = axios.create()

// Interceptors applies to every ajax call
httpRequest.interceptors.request.use(
    function (config: AxiosRequestConfig<any>) {
        // config.headers['Authorization'] = `Bearer ${localStorage.getItem('LonShopToken')}`
        return config
    },
    function (err) {
        return Promise.reject(err)
    }
)

// Global response result config
httpRequest.interceptors.response.use((res: AxiosResponse<ResponseResult, any>) => res, (err: Error | AxiosError) => {
    if (axios.isAxiosError(err)) {
        // Access to config, request, and response
        const result: ResponseResult = {
            code: err.code ? parseInt(err.code) : -1,
            msg: 'request api error',
            data: null
        }
        return Promise.reject(result);
    } else {
        // Just a stock error
        const result: ResponseResult = {
            code: -1,
            msg: 'request error',
            data: null
        }
        return Promise.reject(result);
    }
})

export default httpRequest