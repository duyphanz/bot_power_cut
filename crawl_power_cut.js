var {getContacts} = require('./jsonbin')
var CronJob = require('node-cron');
const utf8 = require('utf8');
var local = "TÂN AN"
// var local = "CẦN GIUỘC"
// var lst_contacts = ['431795805', '684535102']
var request = require('request');

var current = new Date()
current.setDate(current.getDate() + 1)
console.log(current.toUTCString())
// current.setUTCHours(21)

var d, m, y
d = current.getDate()
m = current.getMonth() + 1
y = current.getFullYear()



var url = 'http://giadien.vietbao.vn/lich-cat-dien/long-an/ngay-' + d + '-' + m + '-' + y + '.html'

// getData()
//   .then(values => {
//     // console.log(values)
//     // console.log('Quantity: ', values.length)
//     console.log('KQ: ', formatResponse(values))
//   })
//   .catch(err => console.log(err))

//===================================
//'00 00 18 * * 0-6'
CronJob.schedule('* * * * *', function () {

  var rs
  getData()
    .then(values => {
      // console.log(values)
      // console.log('Quantity: ', values.length)
      rs = formatResponse(values)
      console.log('KQ: ', rs)
      return getContacts()

      // return sendMesage(rs, lst_contacts)
    })
    // .then(res => console.log(res))
    .then(res => {
      let lst_contacts = JSON.parse(res).contact_ids
      return sendMesage(rs, lst_contacts)
    })
    .catch(err => console.log(err))

});

// CronJob.schedule('* * * * *', function () {
//   sendMesage('running every minute.')
//     .then(res => console.log(res.body))
//     .catch(err => console.log(err))
// });

function formatResponse(arr) {
  if (arr.length < 1) return
  let response = `
  [CẦN GIUỘC, ngày ${d}-${m}-${y} ]
   | Thời gian | Phạm vi ảnh hưởng |
  `
  arr.forEach(e => {
    let text = `
    ${e.h_start}:${e.m_start}-${e.h_end}:${e.m_end} | ${e.detail}
    `
    response += text
  })
  return response
}

function getData() {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
      // var reg_local = /<tr rowspan=''><td>(\d+):(\d+)<\/td><td>(\d+):(\d+)<\/td><td>BẾN LỨC<\/td><td\sclass='column-detail'>([a-zA-Z0-9,.\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td\sclass='column-reason'>([a-zA-Z0-9,.\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td class='column-device'>/gm
      if (error) return reject(error.message)
      var reg_text = "<tr rowspan=''><td>(\\d+):(\\d+)<\/td><td>(\\d+):(\\d+)<\/td><td>" + local + "<\/td><td\\sclass='column-detail'>([()+/;a-zA-Z0-9,.-\\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td\\sclass='column-reason'>([[()+/;a-zA-Z0-9,.\\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td class='column-device'>"
      var reg_local = new RegExp(reg_text, 'gm')

      var values = [], match
      while (match = reg_local.exec(body)) {
        var obj = new Object({
          h_start: match[1],
          m_start: match[2],
          h_end: match[3],
          m_end: match[4],
          detail: match[5],
          reason: match[6]
        })
        values.push(obj)
      }

      // console.log(arg)
      // console.log(url)
      return resolve(values)
    });


  })
}

function sendMesage(message, ids) {
  if (!message) return "no message"
  message = utf8.encode(message)

  return new Promise((resolve, reject) => {
    ids.forEach(id => {
      let url = "https://api.telegram.org/bot458643110:AAGAyXPT386GgoeCK5whAO9HhbhJFWz2iP4/sendMessage?chat_id=" + id + "&text=" + message
      request(url, (error, response) => {
        if (error) return reject(error.message)
        // console.log(response.body)
        // return resolve(response.body)
      })
    })
  })
}

