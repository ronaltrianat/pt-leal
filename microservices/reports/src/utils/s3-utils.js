'use strict'

var AWS = require('aws-sdk');
const config = require('../config/')


const s3 = new AWS.S3(config.S3Settings.credentials);


const uploadFileS3 = (data) => {

    return new Promise((resolve, reject) => {
        try {
            let keyObject = `${config.S3Settings.folderReports}${new Date().getTime()}.xlsx`
            let params = {
                Bucket: config.S3Settings.bucketReports,
                Key: keyObject,
                Body: data
            }

            s3.putObject(params, function (resp) {    
                let response = { file : `${config.S3Settings.endpointReports}${config.S3Settings.folderReports}${keyObject}`}
                resolve(response)
            });
        
        } catch (error) {
            reject(error)
        }
    });    
}


module.exports = Object.assign({}, {uploadFileS3})