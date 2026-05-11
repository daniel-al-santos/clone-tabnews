import database from "/infra/database.js"// caminho relativo de importação
//import database from "/infra/database.js"


async function status(request, response) {

  const result = await database.query('SELECT 1+1 as sum;')
  const updateAt = new Date().toISOString(); //ISO8601

  const version_db = await database.query("SHOW server_version;")
  const max_connections = await database.query("SHOW max_connections;")

  const dataBaseName = process.env.POSTGRES_DB;
  const active_connections = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE state='active' and datname=$1;",
    values:[dataBaseName]
  })

  response.status(200).json({
    update_at: updateAt,
    dependencies:{
      database: {
        version: version_db.rows[0]['server_version'],
        max_connections: parseInt(max_connections.rows[0]['max_connections']),
        active_connections: active_connections.rows[0].count
      }
    }
  });
}

export default status;
