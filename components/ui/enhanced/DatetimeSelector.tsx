"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {FCProps} from "@/lib/declares/props";
import {formatDate, formatNativeDate, readDate} from "@/lib/utils";

interface Props extends FCProps {
    date: string,
    time: string
    setDate: Function
    initialNode?: React.ReactNode
}

export function DatetimeSelector({date, setDate}: Props) {
    const [open, setOpen] = React.useState(false)
    // const [date, setDate] = React.useState<Date | undefined>(undefined)

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                    日期
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date-picker"
                            className="w-32 justify-between font-normal"
                        >
                            {date ? formatDate(date) : "选择日期"}
                            <ChevronDownIcon />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={readDate(date)}
                            captionLayout="dropdown"
                            onSelect={(date) => {
                                setDate(date ?formatNativeDate(date) : "")
                                setOpen(false)
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex flex-col gap-3">
                <Label htmlFor="time-picker" className="px-1">
                    时间
                </Label>
                <Input
                    type="time"
                    id="time-picker"
                    step="1"
                    defaultValue="10:30:00"
                    className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                />
            </div>
        </div>
    )
}
