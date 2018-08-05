var express = require('express')
var bodyParser = require('body-parser')
var {getContacts, updateContacts} = require('./jsonbin')

var app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('done')
})

app.post('/message', (req, res) => {
    let message = req.body.message
    console.log(message)
    switch (message.text) {
        case '/start':
            getContacts()
                .then(res => {
                    let lst_contacts = JSON.parse(res).contact_ids
                    let new_contact = message.chat.id
                    let confict = false
                    lst_contacts.forEach(e => {
                        // console.log(e.id)
                        // console.log(new_contact)
                        if (e.id == new_contact) {
                            console.log('trung nhau')
                            confict = true
                        }
                    })
                    // console.log(confict)
                    if(confict) return {body: "Id exists "}
                    let obj =
                    {
                        "status": "on",
                        "last_name": message.chat.last_name,
                        "first_name": message.chat.first_name,
                        "id": new_contact + ""
                    }
                    lst_contacts.push(obj)
                    // console.log(lst_contacts)
                    let new_obj = {
                        "contact_ids": lst_contacts
                    }
                    // new_obj = JSON.stringify(new_obj)
                    console.log(new_obj)
                    return updateContacts(new_obj)
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))
            break;

        default:
            break;
    }
    
    res.send('OK')
})

app.listen(process.env.PORT || 3000, (err) => {
    if (err) return console.log('Error: ', err)
    console.log('Server is running on port 3000.')
})

require('./crawl_power_cut')



