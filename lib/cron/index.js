'use strict'

const nodeMailer = require('nodemailer')
const Constants = require('../constants')


const transporter = nodeMailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'markus.bins39@ethereal.email',
        pass: '17jyXgDGhyE5zfqcWS'
    }
})
 
const mailOptions = {
    from: 'markus.bins39@ethereal.email', // sender address
    to: 'maddy@gmail.com', // list of receivers
    subject: 'Rating Service Redis Update At Time', // Subject line
    text: 'A Message from Node Cron App', // plain text body
    html: '<b>A Message from Node Cron App</b>'
}

// function T () {
//     console.log(`Hello ${new Date()}`)
// }

// function scheduler () {
//     console.log(`Scheduler 1 activated: ${new Date()}`)
//     return new CronJob('0 */10 * * * *', () => T())
// }


module.exports = {
  transporter,
  mailOptions
//   scheduler
}

