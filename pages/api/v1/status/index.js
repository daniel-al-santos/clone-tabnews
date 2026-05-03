import database from "/infra/database.js"// caminho absoluto de importação
//import database from "/infra/database.js"// caminho relativo de importação


async function status(request, response) {

  const result = await database.query('SELECT 1+1 as sum;')
  console.log(result.rows)
  response.status(200).json({ 200: "tudo certo por aqui" });
}

export default status;
