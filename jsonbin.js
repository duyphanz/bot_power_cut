var request = require('request')
var {token} = require('./token')

function getContacts(){
    return new Promise((resolve, reject) => {
        let headers = {
            'secret-key': token
        }
        let url = "https://api.jsonbin.io/b/5b6531347b212953678aa225/2"
        request({url, headers}, (err, res) => {
            if(err) return reject(err.message)
            resolve(res.body)
        })
    })
}

// getContacts()
// .then(res => console.log(res))
// var json = {
//     "contact_ids": [
//         {
//             "status": "on",
//             "last_name": "Phan",
//             "first_name": "Duy",
//             "id": "431795805"
//         },
//         {
//             "status": "on",
//             "last_name": "Nguyen",
//             "first_name": "Nhu",
//             "id": "684535102"
//         }
//     ]
// }
function updateContacts(json){
    return new Promise((resolve, reject) => {
        let headers = {
            'secret-key': token,
            'Content-Type': 'application/json',
            'versioning': false
        }
        let url = "https://api.jsonbin.io/b/5b6531347b212953678aa225"
        request.put({url, headers, json}, (err, res) => {
            if(err) return reject(err.message)
            resolve(res.body)
        })
    })
}

// updateContacts(json)
// .then(res => console.log(res))
// .catch(err => console.log(err.message))

module.exports = { getContacts, updateContacts }