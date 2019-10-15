require('dotenv').config()
const axios = require('axios') // To send the sendgrid status to jsonstore
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
      sgMail
      .send(msg, (error, result) => {
        if (error) {
          const sendgriderror = JSON.stringify(error)
          axios.post('https://www.jsonstore.io/3dfd871004bd5b6bbdec52533694cd78b8581b6d3612d7dd6396197ebffd2ade', {
            sendgriderrors: sendgriderror
          })
          .then((res) => {
            console.log(`statusCode: ${res.statusCode}`)
            console.log(res)
          })
          .catch((error) => {
            console.error(error)
          })


         console.error(error.toString()) //Do something with the error
        }
        else {
         console.log("MF: sendgrid succeeded") //Celebrate
       //  console.log("MF: show result: ", result)
         const sendgridresult = JSON.stringify(result)
                 axios.post('https://www.jsonstore.io/3dfd871004bd5b6bbdec52533694cd78b8581b6d3612d7dd6396197ebffd2ade', {
                  sendgridresults : sendgridresult
         })
        }
      })
             
        callback(null, {
        statusCode: 200, 
        headers, 
        body: JSON.stringify({ body: "Formdata: Message: " + message + " API key: " + process.env.TESTKEY1 }),
    })
   } 
}
