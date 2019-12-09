'use strict'

const nodeMailer = require('nodemailer')
const Constants = require('../constants')


const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'pedro.brakus@ethereal.email',
        pass: 'pAzJZU8VcdJ4mAAwky'
    }
})
 
const mailOptions = {
    from: 'pedro.brakus@ethereal.email', // sender address
    to: 'casaoneteam@gmail.com', // list of receivers
    subject: `Rating Service Redis Update At Time : ${new Date()}`, // Subject line
    text: 'A Message from Node Cron App', // plain text body
    html: '<b>Cron Job Ran Successfully! Hurray !</b>'
}

module.exports = {
  transporter,
  mailOptions
//   scheduler
}

