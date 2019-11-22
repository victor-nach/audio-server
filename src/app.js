const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/../views'));
app.use(express.static(`${path.join(__dirname)}/../public`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser)

app.get('/', (req, res) => res.render('index'));

app.post('/send_file', upload.single('soundBlob'), (req, res) => {
  console.log('here', req.body, req.file);
});
app.listen(PORT, () => console.log(`serving on port ${PORT}`));

module.exports = app;
