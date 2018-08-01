
// var arg = process.argv[2]
var request = require('request');
request('http://giadien.vietbao.vn/lich-cat-dien/long-an.html', function (error, response, body) {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body); // Print the HTML for the Google homepage.
  // var reg_local = /<tr rowspan=''><td>(\d+):(\d+)<\/td><td>(\d+):(\d+)<\/td><td>BẾN LỨC<\/td><td\sclass='column-detail'>([a-zA-Z0-9,.\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td\sclass='column-reason'>([a-zA-Z0-9,.\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td class='column-device'>/gm

  var reg_text = "<tr rowspan=''><td>(\\d+):(\\d+)<\/td><td>(\\d+):(\\d+)<\/td><td>BẾN\\sLỨC<\/td><td\\sclass='column-detail'>([a-zA-Z0-9,.\\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td\\sclass='column-reason'>([a-zA-Z0-9,.\\sắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴ]*)<\/td><td class='column-device'>"
  var reg_local = new RegExp(reg_text, 'gm')
  
  var values = [], match
  while( match = reg_local.exec(body)){
    var obj = new Object({
      m_start: match[1],
      h_start: match[2],
      m_end: match[3],
      h_end: match[4],
      detail: match[5],
      reason: match[6]
    })
    values.push(obj)
  }
  console.log(values)
  console.log('Quantity: ', values.length)
  // console.log(arg)
  var current = new Date()
  console.log(current.toUTCString())
});