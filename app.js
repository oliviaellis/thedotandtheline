const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('assets'));
//

app.get('/', (req, res) => {
  res.render('main.ejs');
})

app.listen(port, () => { console.log('Server is running')});
