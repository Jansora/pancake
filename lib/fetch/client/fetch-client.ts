// import {fetchCurrentUser} from "@/lib/utils";

import {toast} from "sonner";
import {failed, friendlyError, ResultDto} from "@/lib/fetch";
import {useEffect, useState} from "react";

export function clientHeader() {

    return {
        'Content-Type': 'application/json'
    }
}


export function useFetchClient(initialData: any, initialLoading: boolean, url: string, options?: any ){

    const [loading, setLoading] = useState<boolean>(initialLoading)

    const [data, setData] = useState<any>(initialData)

    useEffect(() => {
        if (loading) {
            fetchClient(url, options, setLoading)
                .then(({data}) => {
                    if (data.status) {
                        setData(data.data)
                    }
                    else {
                        toast.error(data.data)
                    }
                })
                .catch(reason => {
                    // 捕获网络异常或抛出的错误
                    console.error('网络错误, 请检查网络连接:', reason);
                    toast.error( "网络错误, 请检查网络连接")
                    // throw new Error("网络错误, 请检查网络连接:", error)
                })
                .finally(() => {
                    setLoading(false)
                })

        }

    }, [loading])


    // @ts-ignore
    return [data, loading, setLoading];
}


export async function fetchClient(url: string, options?: any, setLoading?:any, formBody?: boolean): Promise<{
    data: ResultDto<any>;
    response: Response;
}>  {

    let response: Response;

    setLoading && setLoading(true)
    try {
        // 发送请求

        response = await fetch(url, !formBody ? {
            headers: clientHeader(),
            ...options ,
        }: { ...(options || {})});

        setLoading && setLoading(false)

        // 检查响应状态码
        if (response.ok) {
            // 检查响应的内容类型
            const contentType = response.headers.get("content-type");

            // 根据内容类型解析响应数据
            let data : ResultDto<any>;
            if (contentType && contentType.includes("application/json")) {
                // 解析 JSON 数据
                data = await response.json();
            } else if (contentType && contentType.includes("text")) {
                // 解析纯文本数据
                // @ts-ignore
                data = await response.text();
            } else if (contentType && contentType.includes("form")) {
                // 解析表单数据
                // @ts-ignore
                data = await response.formData();
            } else if (contentType && contentType.includes("image")) {
                // 解析二进制数据（如图片）
                // @ts-ignore
                data = await response.blob();
            } else {
                // 对于其他类型或未知类型，使用 arrayBuffer
                // @ts-ignore
                data = await response.arrayBuffer();
            }

            // 这里可以处理数据
            // console.log("fetchClient data", data);

            if (!data.status) {
                console.warn(friendlyError(data))
                toast.error(friendlyError(data))
            }
            return {response, data};
        }

    } catch (error) {
        // 捕获网络异常或抛出的错误
        console.warn('网络错误, 请检查网络连接:', error);
        // @ts-ignore
        toast.error('网络错误, 请检查网络连接:', {description: error.toString()})

        // throw new Error("网络错误, 请检查网络连接:", error)
    }

    // @ts-ignore
    return {response, data: failed("999", "unknown error")};
}






