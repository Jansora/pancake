import {cn} from "@/lib/utils";

export const IconFont = ({name, className}: {name:string, className?:string | null}) => {


    return <svg className={cn("fill-current w-4 h-4", className)} aria-hidden="true">
        <use xlinkHref={`#icon-${name}`}></use>
    </svg>




}