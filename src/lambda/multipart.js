require('dotenv').config()
var Multipart = require('lambda-multipart')

export function handler (event, context, callback){
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
