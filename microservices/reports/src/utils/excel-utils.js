'use strict'

var excel = require('exceljs');
var AWS = require('aws-sdk');


const s3 = new AWS.S3({
    credentials: {
      accessKeyId: 'AKIAIEVP3BGBWZTXF6RQ',
      secretAccessKey: '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',
    }
});


const generateExcel = (data) => {

    return new Promise((resolve, reject) => {
        try {
            var workbook = new excel.Workbook();
            var sheet = workbook.addWorksheet('Transactions')
            sheet.addRow().values = Object.keys(data[0])
    
            data.forEach(function(item) {
                var valueArray = [];
                valueArray = Object.values(item);
                sheet.addRow().values = valueArray; 
            })
    
            workbook.xlsx.writeBuffer().then(function(buffer) {

                let keyObject = `${new Date().getTime()}.xlsx`

                s3.putObject({
                    Bucket: 'leal-reports-pt',
                    Key: keyObject,
                    Body: buffer.toString('base64'),
                    }, function (resp) {
                        let response = { file : `https://s3.amazonaws.com/leal-reports-pt/${keyObject}`}
                        resolve(response)
                    });
            });
        
        } catch (error) {
            reject(error)
        }
    });    
}


module.exports = Object.assign({}, {generateExcel})