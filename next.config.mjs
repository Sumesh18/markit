import { model } from 'mongoose';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*.googleusercontent.com'
            },
            {
                hostname: "markit-bucket.s3.amazonaws.com"
            }
        ]
    }
};

export default nextConfig;
