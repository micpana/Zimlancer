//setting up express js server
import express from 'express';
import graphlHTTP from 'express-graphql';//graphql
import mongoose from 'mongoose';//adding configuration for mongoose
import schema from './schema';
var cors = require('cors');
// app.use(cors());
/////////////////////////////////////////////////////////
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')


// //cors stuff for local frontend
// var corsOptions = {
//     origin: ['http://localhost:3000', 'http://localhost:3001' ]
//     // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
  //cors stuff for live frontend
var corsOptions = { 
  origin: ['https://zimlancer.co.zw', 'https://zimlancer.co.zw:3000', 'https://www.zimlancer.co.zw', 'https://www.zimlancer.co.zw:3000','https://zimlancer.netlify.com', 'https://zimlancer.netlify.com:3000']
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


const app = express(); 
const PORT = 3008;//Port setup for the server 


mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/zimlancer-db');////////local
mongoose.connect('mongodb://admin:admin@1234.zimlancer@ds341557.mlab.com:41557/zimlancer1');//////////////live

app.get('/', (req, res) => {
    res.json({
        msg: 'Zimlancer backend is online'
    })
});
app.use('/graphql/', cors(corsOptions),graphlHTTP({//part of graphql middleware
    schema: schema,
    graphiql: true
}));

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});
////////////////////////////////////////////////////////////////////////////

app.use(logger('dev'))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(cookieParser())
app.use(fileUpload())
//uploading service images
app.use('/images', express.static(__dirname + '/images'))

app.post('/serviceimage', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    uploadFile.mv(
      `${__dirname}/images/services/${fileName}`,
      function (err) {
        if (err) {
          return res.status(500).send(err)
        }
  
        res.json({
          file: `images/${req.files.file.name}`,
        })
      }
    )
  })
  // upload bid image
  app.post('/bidimage', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    uploadFile.mv(
      `${__dirname}/images/bids/${fileName}`,
      function (err) {
        if (err) {
          return res.status(500).send(err)
        }
  
        res.json({
          file: `images/${req.files.file.name}`,
        })
      }
    )
  })
   // upload profile image
   app.post('/profileimage', (req, res, next) => {
    let uploadFile = req.files.file
    const fileName = req.files.file.name
    uploadFile.mv(
      `${__dirname}/images/profilepictures/${fileName}`,
      function (err) {
        if (err) {
          return res.status(500).send(err)
        }
  
        res.json({
          file: `images/${req.files.file.name}`,
        })
      }
    )
  })

