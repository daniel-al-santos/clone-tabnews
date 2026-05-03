import { Client } from "pg";

async function query(queryObject){
    const client = new Client({
        //como estou rodando o docker no WSL precisei apontar o IP do wsl (hostname -I -> wsl)
        //caso quisesse trabalhar tudo la dentro é só fazer uma copia do projeto e iniiciar la
        //Ai poderia usar localhost na chave host de conexão
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD
    });
    await client.connect();
    const result = await client.query(queryObject);
    await client.end();
    return result;
}

export default {
    query: query,
};