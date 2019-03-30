const express    = require('express');
const app        = express();
const port       = 6969;
const bodyParser = require('body-parser');
const fs         = require('fs');
const { spawn }  = require('child_process');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.get('/results/:dete/:zad', function(req, res) {
    const dete = req.params.dete;
    const zad  = req.params.zad;
    res.sendFile('/results/' + dete + '/' + zad + '.txt', {root: __dirname + '/../'});
});

app.post('/submit', function(req, res) {
    console.log(req.body);
    fs.writeFile(__dirname + `/../solutions/${req.body.dete}/${req.body.zad}.cpp`, req.body.code, function() {
        console.log('saved');
	const prc = spawn('../check', [req.body.dete, req.body.zad]);
	prc.on('close', () => {
    		console.log('done testing');
    		res.redirect(`/results/${req.body.dete}/${req.body.zad}`);
	}
        );
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
