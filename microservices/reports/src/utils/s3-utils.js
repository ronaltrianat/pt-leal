'use strict'

var AWS = require('aws-sdk');
const config = require('../config/')


const s3 = new AWS.S3(config.S3Settings.credentials);


const uploadFileS3 = (fileData) => {

    return new Promise((resolve, reject) => {
        try {
            let keyObject = `${config.S3Settings.folderReports}${new Date().getTime()}.xlsx`
            let params = {
                Bucket: config.S3Settings.bucketReports,
                Key: keyObject,
                Body: fileData
            }
            
            s3.putObject(params, function (err, data) {    
                if (err) reject(err)
                
                let response = { 
                    file : `${config.S3Settings.endpointReports}${config.S3Settings.folderReports}${keyObject}`
                }
                resolve(response)
            });
        
        } catch (error) {
            reject(error)
        }
    });    
}


module.exports = Object.assign({}, {uploadFileS3})