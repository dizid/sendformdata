# sendformdata
Serverless function: node.js API to accept form data from  [dizid.com/contact] and sends an email 

## Feature
This function receives form data (name, email, message) in json format.
It then calls the sendgrid API to email the received formdata.

## Deploy
In sendformdata.js: Configure the [const msg] to your needs
Register sendgrid API key as environment variable(s) at Netlify



