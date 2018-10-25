let express = require('express');
let app = express();
let cors = require('cors');
let bodyParser = require('body-parser');
let fetch = require('cross-fetch');
app.use(express.static(__dirname + "/public"));
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// app.get("", function (request, response) {
//
// });

app.get("/filter", function (request, response) {
    const url = "http://www.mrsoft.by/data.json";
    fetch(url)
        .then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        })
        .then(data => {
            response.json(data)
        })
        .catch(err => {
            console.error(err);
        });
});
app.listen(3000);