var text = 'helloll'

var reg = new RegExp('he(\\w+)oll', 'gm')

var result = reg.exec(text)

console.log(result)