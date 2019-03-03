const dbSettings = {
    database: process.env.DB      || 'pt_leal_db',
    user: process.env.DB_USER     || 'user_leal',
    password: process.env.DB_PASS || 'password',
    host: process.env.DB_HOST     || 'localhost',
    connectionLimit: process.env.DB_CONNETION_LIMIT || 10
}
  
const serverSettings = {
    port: process.env.PORT || 4204
}

const S3Settings = {
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
    },
    bucketReports: process.env.BUCKET_REPORTS || 'leal-reports-pt',
    endpointReports: process.env.ENDPOINT_REPORTS || 'https://s3.amazonaws.com/leal-reports-pt/',
    folderReports: process.env.FOLDER_REPORTS || 'reports/'
}
  
module.exports = Object.assign({}, { serverSettings, dbSettings, S3Settings })
