# JournalAPI
Simple NODE.js API to be consumed by JournalApp for CS 406

## To run locally

Install MongoDB and start mongod service. Instructions can be found <a href="https://docs.mongodb.com/manual/installation/">here</a>.

Clone repo:<br/>
`git clone https://github.com/taylorrgriffin/JournalAPI.git`


Install dependencies and start API:<br/>
`npm install`<br/>
`npm start`

## Avaliable Endpoints

_Fetch all entries:_<br/>
`GET /entry`

_Add entry:_<br/>
`POST /entry` with request body like:<br/>
`{
  "subject:" "Example Subject Line",
  "body:" "Example content..."
}`

_Update entry:_<br/>
`PATCH /entry/entryId` with request body like:<br/>
`{
  "subject:" "Example Subject Line",
  "body:" "Example content..."
}`

_Delete entry:_<br/>
`DELETE /entry/entryId`

_Delete all entries:_<br/>
`DELETE /entry`
