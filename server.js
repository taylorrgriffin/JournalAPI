const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, content-type'
    );
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.get('/', (req, res, next) => {
    res.status(200).send("OK");
})

app.get('*', (req, res, next) => {
    res.status(404).send('Page not found.')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log('Server listening on ' + PORT)
})