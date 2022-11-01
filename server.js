const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://demo:demo123@cluster0.t5ge5m8.mongodb.net/demo?retryWrites=true&w=majority";
const dbName = "demo";

app.listen(3000, () => {
    console.log('app is running on port 3000')
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

app.get('/api', (req, res) => {

  let myCardList = [
    'images/benzema.png','images/cr7.png','images/deBruyne.png','images/kante.png','images/lewy.png',
    'images/mane.png','images/messi.png','images/neymar.png','images/salah.png','images/son.png',
]

function getShuffledDeck(){
    return myCardList.concat(myCardList).map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort).map(({ value }) => value)
}

let shuffledDeck = getShuffledDeck()
console.log(shuffledDeck)

  res.end(JSON.stringify(shuffledDeck));

})

