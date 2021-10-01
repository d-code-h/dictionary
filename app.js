const express = require('express'),
  app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(process.env.port, () => {
  console.log('=============================');
  console.log('Server Started at port' + ' ' + process.env.port);
  console.log('=============================');
});
