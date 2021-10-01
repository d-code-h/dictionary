const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  superagent = require('superagent'),
  PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  res.locals.defs = defs;
  next();
});

var defs;
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', async (req, res) => {
  let word = req.body.word;
  // promise with async/await
  const findMeaning = async (url) => {
    try {
      const res = await superagent.get(url);
      const result = JSON.parse(res['text']);
      return result[0]['meanings'][0]['definitions'];
    } catch (err) {
      console.error(err);
    }
  };

  var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
  const defs = await findMeaning(url);
  res.render('index', { defs: defs });
});

app.listen(PORT, () => {
  console.log('=============================');
  console.log(`Server Started at port ${PORT}`);
  console.log('=============================');
});
