require('dotenv').config()
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY) // API key should come from Netlify environment variables
exports.handler = function(event, context, callback) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'x-www-form-urlencoded',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Max-Age': '2592000'
  }
   if (event.httpMethod === 'POST') {
   const{ name, email, message } = JSON.parse(event.body) // These are grabbed from the event in the handler above
    const msg = {
        to: 'marc@dizid.com',
        from: 'sendformdata@example.com',
        subject: 'New comment from: ' + name + ' on dizid.com/contact',
        text: message + "From: " + email,
        html: '<strong>' + message + '</strong><br>From: ' + email,
      }
      sgMail.send(msg), // This is the main function of this function!
        callback(null, {
        statusCode: 200, 
        headers, 
        body: JSON.stringify({ body: "Formdata: Message: " + message + " API key: " + process.env.TESTKEY1 }),
    })
   } 
}
