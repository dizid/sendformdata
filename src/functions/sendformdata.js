// require('dotenv').config() // DEV ONLY
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY) // API key should come from Netlify environment variables
exports.handler = function(event, context, callback) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
       'Content-Type': 'x-www-form-urlencoded',
        'Access-Control-Allow-Methods': 'POST,OPTIONS',
        'Access-Control-Max-Age': '2592000'
  }
   if (event.httpMethod !== 'POST') {
    // To enable CORS
    callback(null,  {
      statusCode: 200, // <-- Important!
      headers,
      body: 'This was not a POST request!'
    })
} 
   if (event.httpMethod === 'POST') {
    
     const{ name, email, message } = JSON.parse(event.body) // These are grabbed from the event in the handler above
    const msg = {
        to: 'marc@dizid.com',
        from: 'sendformdata@netlifyfunctions.com',
        subject: 'New comment from: ' + name + ' on dizid.com',
        text: message + "From: " + email,
        html: '<strong>' + message + '</strong><br>From: ' + email,
      }
      sgMail.send(msg), 
        callback(null, {
        statusCode: 200, 
        headers, 
        body: JSON.stringify({ msg: "Thanks for your message " + name + " Email: " + email + " Msg: " + message}),
    })
   } 
}
