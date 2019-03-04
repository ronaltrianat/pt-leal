'use strict'

var excelUtils = require('../utils/excel-utils');
var s3Utils = require('../utils/s3-utils');
var md5 = require('md5')

const repository = (db) => {
    
    /**
     * Funcion encargada de generar el reporte de las transacciones 
     * y subirlo a un bucket de Amazon S3. Se devuelve el link de 
     * acceso al reporte.
     */
    const generateReport = async (user) => {

        let query = `select t.transaction_id, t.created_date, t.value, t.points, 
                            t.status, u.name, u.lastname, u.email
                     from transactions t
                     inner join users u on u.user_id = t.fk_user_id
                     where t.fk_user_id = ?`

        let rows = await db.query(query, [md5(user)])
        let file = await excelUtils.generateExcel(rows)
        let response = await s3Utils.uploadFileS3(file)
        
        return response
    }

    const disconnect = () => {
        db.close()
    }
    
    return Object.create({
        generateReport,
        disconnect
    })
}

const connect = (connection) => {
    return new Promise((resolve, reject) => {
      if (!connection) {
        reject(new Error('connection db not supplied!'))
      }
      resolve(repository(connection))
    })
}

module.exports = Object.assign({}, {connect})