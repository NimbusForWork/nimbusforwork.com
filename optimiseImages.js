var fs = require('fs')
var sharp = require('sharp')

var inputDir = './static/images/'
var outputDir = './static/'
let squareFolder = './static/square/images/'
let rectFolder = './static/rect/images/'

/*
* reduces all images to maxwidth
* will not reduce them if they are already smaller
*/
var maxwidth = 100
fs.readdir([__dirname, '/', inputDir].join(''), function(err, files) {


files.forEach(file => {
  let inputName = inputDir + file

  // resize
  let sizes = [100,300,800,1000].forEach(width => {
    let outputName = outputDir + width + '/images/' + file
    sharp(inputName)
    .resize(width)
    .withoutEnlargement()
    .toFile(outputName, function(err, info) {
      if (err) console.log('err ' + file, err)
    })
  })

  // crop to small square
  let squareWidth = 200
  let destSquare = squareFolder + file
  sharp(inputName)
  .resize(squareWidth, squareWidth)
  .crop(sharp.strategy.entropy)
  .toFile(destSquare, function(err, info) {
    if (err) console.log('err ' + file, err)
  })

  // crop to small square
  let rectWidth = 640
  let rectHeight = 320
  let destRect = rectFolder + file
  sharp(inputName)
  .resize(rectWidth, rectHeight)
  .crop(sharp.strategy.entropy)
  .toFile(destRect, function(err, info) {
    if (err) console.log('err ' + file, err)
  })

})


})
