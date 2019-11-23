const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/../views'));
app.use(express.static(`${path.join(__dirname)}/../public`));


// bodyparser not useful when working with formdata??
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser)

app.get('/', (req, res) => res.render('index'));

app.post('/send_file',
  // in upload.single, you have to reference the fieldname set in append
  // that's how it knows what exactly to put in req.file
  upload.single('soundBlob'),
  (req, res) => {
  // using multer req.bidy coming from form data contains normal form elements if any
    console.log(req.body);

    // also req.file contains multipart form data if any
    // originalname - original name as specified in the 3rd param of fd.append
    // fieldname - fieldname also as specified in the first param of fd.append
    // buffer - ??
    console.log('req.file: ', req.file);

    const uploadLocation = `${path.join(__dirname)}/../public/uploads/${req.file.originalname}`;

    // write file sync blocks the main thread, until the writing has been completed
    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));
    // you can use the async version as well, that calls a callback function, once the operation is done

    return res.status(200).json({
      message: 'cool',
    });
  });
app.listen(PORT, () => console.log(`serving on port ${PORT}`));

module.exports = app;
