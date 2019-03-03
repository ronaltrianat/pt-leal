'use strict'

var excel = require('exceljs');

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
                resolve(buffer.toString('base64'))
            });
        
        } catch (error) {
            reject(error)
        }
    });    
}

module.exports = Object.assign({}, {generateExcel})