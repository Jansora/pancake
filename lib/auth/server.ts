import {auth} from "@/lib/auth/default";
import {AccountProps} from "../declares/account";

export const isServerLogged = async () => {
    return !! await getServerUser()
}


export const getServerUser = async () => {
    const session = await auth()
    if (!session) {
        return null
    }
    //@ts-ignore
    const user: AccountProps = session?.user

    return user
}