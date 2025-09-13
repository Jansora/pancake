import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
// import * as dayjs from "dayjs";
// import * as zhCn from 'moment/locale/zh-cn';
import 'dayjs/locale/zh-cn' // ES 2015
import _copy from 'copy-to-clipboard';
import {toast} from "sonner";

const dayjs = require('dayjs');

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// 引入 dayjs 和 timezone 插件
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
// 加载插件
dayjs.extend(utc);
dayjs.extend(timezone);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyClient(text: string) {
  if(_copy(text)) {
    toast.success("拷贝到剪切板成功 (内容如下)",{
      description: (!!text && text.length > 80) ? (text.substring(0, 60) + "......" + text.substring(text.length - 10, text.length)) : text,
    })
  }
  else {
    toast.error("拷贝失败", {
      description: "未知原因"
    })
  }

}

export function debugMode() {
  return process.env.NODE_ENV == "development";
}
export function prodMode() {
  return process.env.NODE_ENV == "production";
}


export const brownerEnv = () => typeof window !== 'undefined'

export const serverEnv = () => !brownerEnv()


export const momentZh: any = dayjs;


export const parseArray = (data: string) => {
  try {
    return JSON.parse(data)
  }
  catch (e) {
    return []
  }
}

export const parseJSArray = (code: string) => {
  try {
    return new Function(`
          "use strict";
          return ${code}
          `)()
  }
  catch (e) {
    console.error(e)
    return []
  }
}

export const parseJson = (data: string) => {
  try {
    return JSON.parse(data)
  }
  catch (e) {
    return []
  }
}
export const randomString = () => {

  return (Math.random() * 100000000000).toString().split(".")[0]

}



export function isNumber(value: string | undefined) {
  return /^-?\d+(\.\d+)?$/.test((value || "").trim());
}

export function formatDate(date: string) {
  return dayjs(date).tz('Asia/Shanghai').format('YYYY-MM-DD');
}

export function formatNativeDate(date: Date) {
  return dayjs(date).tz('Asia/Shanghai').format('YYYY-MM-DD');
}

export function formatNativeTime(date: Date) {
  return dayjs(date).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}
export function formatTime(date: string) {
  return dayjs(date).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}

export function readDate(date: string) {
  return dayjs(date).tz('Asia/Shanghai');
}
// export function readTime(time: string) {
//   return dayjs(time).tz('Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
// }

export function fromNow(time: string) {
  return dayjs(time).tz('Asia/Shanghai').fromNow();
}
export function fromNowDays(time: string) {
  return dayjs().diff(dayjs(time), 'd');
}


export function generateDateRange(startDate: string, endDate: string) {
  const result = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    // @ts-ignore
    result.push(currentDate.toISOString().split("T")[0]); // 格式化为 YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1); // 日期加 1 天
  }

  return result;
}


// 计算百分数
export function calculatePercentage(part:number, total:number) {
  if (total === 0) return "0.00%";
  return ((part / total) * 100).toFixed(2) + "%";
}



export function uuid() {
  return crypto.randomUUID()
}