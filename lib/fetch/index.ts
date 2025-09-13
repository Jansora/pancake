export declare class ResultDto<T> {
    status: boolean
    data?: T
    errorCode?: string
    errorMessage?: string

}



export function result( status: boolean, errorCode: string, errorMessage: string, data?: any): ResultDto<any> {
    return {
        data, status, errorCode, errorMessage
    }
}

export function succeed(data?: any): ResultDto<any> {
    return {
        data, status: true
    }
}

export function failed( errorCode: string, errorMessage: string): ResultDto<any> {
    return {
        status: false, errorCode, errorMessage
    }
}


export function friendlyError(result: ResultDto<any>){
    return result.errorMessage + `(${result.errorCode || "500"})`
}