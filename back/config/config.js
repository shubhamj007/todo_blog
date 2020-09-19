const env = process.env.NODE_ENV || 'development'; // 'development' or 'test'

const development = {
    app: {
        name: process.env.APP || 'dev',
        port: process.env.PORT || '3000'
    },
    db: {
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '3306',
        name: process.env.DB_NAME || 'todo',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'shubham'
    },
    jwt: {
        encryption: process.env.JWT_ENCRYPTION || 'jwt_encription',
        expiration: process.env.JWT_EXPIRATION || '20000'
    },
};

const test = {
    app: {
        name: 'test',
        port: 3001
    },
    db: {
        dialect: process.env.DB_DIALECT || 'mysql',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '3306',
        name: process.env.DB_NAME || 'todo',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'shubham'
    },
    jwt: {
        encryption: process.env.JWT_ENCRYPTION || 'jwt_encription',
        expiration: process.env.JWT_EXPIRATION || '2000'
    },
    sender_name: 'webvivid7@gmail.com',
    sender_pass: 'g30NeqsbgR',
};

const config = {
    development,
    test
};


const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME || 'shubham707',
    api_key: process.env.API_KEY || '297185446922522',
    api_secret: process.env.API_SECRET || 'FyhzRG_DdoOS5vriwMGE50dLLhU'
});

// uploading the image in cloudinary
// exports.uploads = (file) =>{
//   return new Promise(resolve => {
//       cloudinary.uploader.upload(file, (result) =>{
//           resolve({url: result.url, id: result.public_id})
//       }, {resource_type: "auto"})
//   })
// }


CONFIG = config[env];
module.exports = config[env];