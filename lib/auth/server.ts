import {auth} from "@/lib/auth/auth";
import {UserProps} from "@/lib/declares/user";

export const isServerLogged = async () => {
    return !! await getServerUser()
}


export const getServerUser = async () => {
    const session = await auth()
    if (!session) {
        return null
    }
    //@ts-ignore
    const user: UserProps = session?.user

    return user
}