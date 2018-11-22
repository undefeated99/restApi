const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const routes = require('./routes')
const indexCreate = require('./db')
const port = 3000;

app.use(bodyParser.json())
app.use('/', routes)


app.listen(port, () => {
    console.log('Express server listening on port ' + port);
});
