"use client"
// import CredentialsProvider from "next-auth/providers/credentials"

import * as React from "react"
import {useContext, useEffect, useState} from "react"
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

import {toast} from "sonner";

import {fetchClient} from "@/lib/fetch/client/fetch-client";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Checkbox} from "@/components/ui/checkbox";
import {GlobalStore} from "@/lib/store/global";
import {FCProps} from "../../../lib/declares/props";
import {signIn} from "next-auth/react"
import {LoginType, NotFoundError, PasswordError} from "../../../lib/declares/account";

import {isClientLogged} from "../../../lib/auth/client";

// import { signIn } from '@/lib/auth/auth'


interface UserAuthFormProps extends FCProps {
    // github: {
    //     GITHUB_ID : string
    //     GITHUB_REDIRECT_URI: string
    // }
}

export function UserAuthForm({ className,  ...props }: UserAuthFormProps) {

    // const router = useRouter()

    const pathname = usePathname()

    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepLogin, setKeepLogin] = useState(true);


    const router = useRouter()

    const logged = isClientLogged();

    const { dispatch } = useContext(GlobalStore);

    const params = useSearchParams()

    const callback = params.get("callback") || "/"

    useEffect(() => {
        if (logged) {
            router.push(callback)
            toast.info(
                "你已经登录, 无需重复登录",
            )
        }
    },[])







    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        const response = await signIn("credentials", {
            username,
            password,
            type: LoginType.DEFAULT,
          redirect: false, // 登录成功后跳转
          redirectTo: callback
        }).catch(reason => {
             toast.error(reason)
        });
        // console.log(response)
        if (response?.code === new PasswordError().code) {
          toast.error(new PasswordError().message)
          // 在 UI 中显示错误信息
        }
        else if (response?.code === new NotFoundError().code) {
          toast.error(new NotFoundError().message)
          // 在 UI 中显示错误信息
        } 
        else if (response?.ok) {
            console.log("login succeed")
            console.log(router)
            window.location.href = callback
            // router.push(from)

        }

        // }
        // setIsLoading(true)
        //
        // const {data} = await fetchClient(`/auth/login?pathname=${pathname}`, {
        //     method: 'POST',
        //     body: JSON.stringify({ username, password, keepLogin })
        // })
        // setIsLoading(false)
        //
        // if (data.status) {
        //     toast.success("登录成功")
        //
        //     dispatch({payload: {user: data.data}})
        //
        //     setTimeout(() => {
        //         router.push(pathname || "/")
        //         // window.location.href = "/"
        //     }, 300)
        // }
    }


    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Input
                            className="my-2"
                            placeholder='请输入你的用户名' type='text'
                            value={username} onChange={e => setUsername(e.target.value)}/>
                        <Input
                            autoComplete="current-password"
                            className="my-2" type="password" placeholder='请输入你的密码' value={password}
                                    onChange={e => setPassword(e.target.value)}/>

                        <div className="my-2 flex items-center">

                            <Checkbox  id="terms" defaultChecked={true} onChange={() => setKeepLogin(!keepLogin)} />
                            <Label htmlFor="terms" className="mx-3">保持登录状态</Label>

                        </div>


                    </div>
                    <Button disabled={isLoading}>
                        登录
                    </Button>
                </div>
            </form>
        </div>
    )
}