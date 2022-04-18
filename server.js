const express = require('express');

const path = require('path');

const hbs = require('express-handlebars');

const multer = require('multer');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    console.log('filename')
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    console.log('storage')
    cb(null, 'uploads/')
  },
})
const upload = multer({ storage })

const app = express();

/* Initial config */

app.engine('.hbs', hbs());
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.json());

/* Post requests */

app.post('/contact/send-message', upload.single('projectFile'), (req, res) => {
  
 
  
  const { author, sender, title, message } = req.body;

  if (author && sender && title && message && req.file) {
    res.render('contact', { projectFileName: req.file.originalname, isSent: true });
  }
  else {
    res.render('contact', { isError: true });
  }
})

/* Get requests */

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact', { layout: 'dark' });
});

app.get('/info', (req, res) => {
  res.render('info');
});
app.get('/history', (req, res) => {
  res.render('history');
});
app.use((req, res) => {
  res.status(404).send('404 not found...');
})
app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});