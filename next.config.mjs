/** @type {import('next').NextConfig} */
const nextConfig = {
    missingSuspenseWithCSRBailout: false,
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname : 'res.cloudinary.com'
            },
        ]
    }
};

export default nextConfig;
