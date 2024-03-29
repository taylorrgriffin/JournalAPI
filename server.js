const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const { addEntry, getEntries, deleteEntry, deleteAllEntries, editEntry } = require('./db.connection')

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

app.get('/entry', (req, res, next) => {
    getEntries(res);
});

app.post('/entry', (req, res, next) => {
    addEntry(req.body, res);
});

app.patch('/entry/:entryId', (req, res, next) => {
    editEntry(req.params.entryId, req.body, res);
});

app.delete('/entry/:entryId', (req, res, next) => {
    deleteEntry(req.params.entryId, res);
});

app.delete('/entry', (req, res, next) => {
    deleteAllEntries(res);
});

const PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.log('Server listening on ' + PORT)
})