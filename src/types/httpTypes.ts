/**
 * Define http request types
 */
export type ResponseResult<T = any> = {
    code: number,
    data: T,
    msg: string
}