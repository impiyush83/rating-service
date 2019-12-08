'use strict'

const nodeMailer = require('nodemailer')
const Constants = require('../constants')

const transporter = nodeMailer.createTransport({
    host: 'smtp.google.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: Constants.GOOGLE_ACCOUNT_EMAIL_ADDRESS,
        pass: Constants.GOOGLE_ACCOUNT_PASSWORD
    }
})
 
const mailOptions = {
    from: Constants.GOOGLE_ACCOUNT_EMAIL_ADDRESS, // sender address
    to: Constants.GOOGLE_ACCOUNT_PASSWORD, // list of receivers
    subject: 'Rating Service Redis Updates', // Subject line
    text: 'A Message from Node Cron App', // plain text body
    html: '<b>A Message from Node Cron App</b>'
}


module.exports = {
  transporter,
  mailOptions
}