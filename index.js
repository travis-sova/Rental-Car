const express = require('express');
const bodyParser = require('body-parser');
const rental = require('./rentalPrice');
const fs = require('fs');
const { time } = require('console');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/pictures', express.static('images'));

const formHtml = fs.readFileSync('form.html', 'utf8');
const resultHtml = fs.readFileSync('result.html', 'utf8');

app.post('/', (req, res) => {
    const post = req.body;
    const result = rental.price(
        Date.parse(post.pickupdate),
        Date.parse(post.dropoffdate),
        String(post.type),
        Number(post.age),
        Number(post.license)
    );
    res.send(formHtml + resultHtml.replaceAll('$0', result));
});

app.get('/', (req, res) => {
    res.send(formHtml);
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    console.log(Date());
});
