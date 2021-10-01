const express = require('express'),
  app = express();

const PORT = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log('=============================');
  console.log(`Server Started at port ${PORT}`);
  console.log('=============================');
});
