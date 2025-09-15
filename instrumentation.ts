// instrumentation.ts
import { initial_tables, initialize_account } from "./lib/database/initial";

export async function register() {
    console.log("xxx", process.env.NEXTAUTH_URL)
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // 只在 Node.js 运行时执行
        console.log('初始化数据库表...');
        await initial_tables()
        console.log('初始化管理员账号...');
        await initialize_account()
        console.log('初始化完成');
        // 比如连接数据库、初始化 ORM、加载配置等

    }
}