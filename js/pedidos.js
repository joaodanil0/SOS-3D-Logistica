var getSheets = require('./sheets.js').get

var planilha_hospitais = '1GWLoqPZa_7S-NU16P9k4vus0CZz8FzIKAHdCkzL6AyI'

module.exports = async (req, res)=>{
	var zona_norte = await getSheets(planilha_hospitais,'ZONA NORTE!A:P')
	var zona_sul = await getSheets(planilha_hospitais,'ZONA SUL!A:P')
	res.send([...zona_norte,...zona_sul])
}