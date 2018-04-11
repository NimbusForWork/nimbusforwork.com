require('dotenv').config()
var Multipart = require('lambda-multipart')
var request = require('request')
var Trello = require('node-trello')

const SLACK_URL = process.env.SLACK_URL
const TRELLO_KEY = process.env.TRELLO_KEY
const TRELLO_TOKEN = process.env.TRELLO_TOKEN
const TRELLO_LIST_ID = process.env.TRELLO_LIST_ID // Get the listId: https://api.trello.com/1/boards/59b89aca8e84140f44acd2fa?fields=id,name&lists=open&list_fields=id,name,closed,pos&key=KEY&token=TOKEN
const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY
var MAILGUN_API_DOMAIN = process.env.MAILGUN_API_DOMAIN
var EMAIL_RECIPIENT = process.env.EMAIL_RECIPIENT


var sendToSlack = (name, email, phone, message) => {
  let fields = [
    {
      title: "Name", value: name, short: false
    },
    {
      title: "Email", value: email, short: false
    },
    {
      title: "Phone", value: phone, short: false
    }
  ]
  if (message) fields.push({ title: "Message", value: message, short: false })
  let data = {
    icon_emoji: ":nimbus:",
    attachments: [
      {
        fallback: "New web enquiry",
        color: "#36a64f",
        author_name: "Web enquiry",
        fields: fields
      }
    ]
  }

  request({
    url: SLACK_URL,
    method: "POST",
    json: true,
    body: data
  }, function (error, response, body) {
    if (error) console.log('error', error)
  })
}

var sendToTrello = (name, email, phone, message) => {
  var t = new Trello(TRELLO_KEY, TRELLO_TOKEN)
  let desc = `
  Name: ${name}
  Email: ${email}
  Phone: ${phone}
  Message: ${message}
  `
  t.post('/1/cards/', {
    idList: TRELLO_LIST_ID,
    name: '***NEW*** ' + name,
    desc: desc
  }, (err) => {
    if (err) console.log(err)

  })
}

var sendToEmail = (name, email, phone, message) => {
  var mailgun = require('mailgun-js')({apiKey: MAILGUN_API_KEY, domain: MAILGUN_API_DOMAIN})
  let data = {
    from: `${name} <${email}>`,
    to: EMAIL_RECIPIENT,
    subject: 'New web request from ' + name,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Message: ${message}
    `
  }
  mailgun.messages().send(data, function (error, body) {
    if (error) console.log(error)
  })
}

exports.handler = function(event, context, callback){
  console.log('called', event)
  var origin = event["headers"]["origin"]
  var amp_source = event["queryStringParameters"]["__amp_source_origin"]
  var parser = new Multipart(event)

  parser.on('field',function(key, value){
    console.log('received field', key, value);
  })
  // parser.on('file',function(file){
  //   //file.headers['content-type']
  //   file.pipe(fs.createWriteStream(__dirname+"/downloads/"+file.filename));
  // })

  parser.on('finish',function(result){
    let fields = result.fields
    console.log('result.fields', result.fields)
    try {
      sendToSlack(fields.Name, fields.Email, fields.Phone, fields.Message)
      sendToTrello(fields.Name, fields.Email, fields.Phone, fields.Message)
      sendToEmail(fields.Name, fields.Email, fields.Phone, fields.Message)
    } catch (e) {
      console.log('e', e)
    }

    let responseBody = {result: "Success."} // or {errorMessage: error_description}
    let response = {
      "isBase64Encoded": false,
      "headers": {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': 'AMP-Access-Control-Allow-Source-Origin',
        'AMP-Access-Control-Allow-Source-Origin': amp_source
      },
      "statusCode": 200,
      "body": JSON.stringify(responseBody)
    }
    callback(null, response)
  });
}
