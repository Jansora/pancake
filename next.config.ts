import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        ignoreDuringBuilds: true,   // 构建阶段不再跑 ESLint
    },
    output: 'standalone',
};

export default nextConfig;
