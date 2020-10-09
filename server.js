const express = require('express');
const app = express();
const fs = require('fs');
const users = require('./users.json');
const cors = require("cors")
app.use(express.json());

app.use(cors())

// By user we are getting the data from get ('end-point')
app.get('/user', (req, res) => {
    res.send(users);
})

// For posting the data 
app.post('/post', (req, res) => {
    var user_Details = {
        'name': req.body.name,
        'mobile_number': req.body.mobile_number,
        'enterDate': req.body.enterDate,
        'exitDate': req.body.exitDate,
        'email': req.body.email
    }
    users.push(user_Details);
    fs.writeFile('users.json', JSON.stringify(users), err => {
        if(err){
            res.send(err)
            console.log(err)
        }else{
            res.send('posted...')
        }
    })
})

app.listen(8000, () => {
    console.log('server started on port 8000')
})