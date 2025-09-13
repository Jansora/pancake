"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button"
import React, {useState} from "react";
import {Input} from "@/components/ui/input";

import {FCProps} from "@/lib/declares/props";


interface Props extends FCProps {
    confirmText: string,
    title: string,
    description: string
    confirmCallback?: Function
    cancelCallback?: Function
}
export function Confirm({children, confirmText, title, description, confirmCallback, cancelCallback}: Props) {
    const [inputValue, setInputValue] = useState("")
    const [open, setOpen] = useState(false)
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {
                    children ? <div onClick={() => setOpen(!open)}>{children}</div>
                        : <Button variant="outline" onChange={() => setOpen(!open)}>{title}</Button>
                }
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription >
                        <span >
                        {description}
                        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-red-600">
                            {confirmText}
                        </code>
                        确认
                        </span>
                        <Input className="my-3" onChange={event => setInputValue(event.target.value)} />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => cancelCallback && cancelCallback()}>取消</AlertDialogCancel>
                    <AlertDialogAction disabled={confirmText !== inputValue} onClick={() => confirmCallback && confirmCallback()}>确认</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
