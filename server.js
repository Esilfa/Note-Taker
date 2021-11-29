const express = require('express');
const api = require('./routes');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app =express();


// Setup for parsing JSON and urlencoded form data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// invoke 
app.use(express.static('public'));
app.use('/api', api);


require('./routes')(app);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);
