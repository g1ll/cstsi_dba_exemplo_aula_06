import { MongoClient } from 'mongodb'

const myDB = {
    server: 'localhost',
    port: 27017
}

const uri = `mongodb://${myDB.server}:${myDB.port}`
const client = new MongoClient(uri)

try {
    await client.connect()
    if (client.db('admin').command({ 'ping': 1 }))
        console.log('Conectado!')
    else throw Error('Não foi possível conectar!');

    const produtos = [
        {
            id_prod: 134,
            nome: "SmartTV LG 8K 5G 70\"",
            descricao: "SmartTV LG model LG7020228K5G",
            importado: true,
            preco: 23500,
            qtd_estoque: 150
        },
        {
            id_prod: 135,
            nome: "SmartTV SAMSUMG 8K 5G 45\"",
            descricao: "SmartTV SAMSUMG model SM4520228K5G",
            importado: true,
            preco: 12500,
            qtd_estoque: 150
        }]

    const db = client.db('loja')
    const collection = db.collection('produtos')
    const resultado = await collection.insertMany(produtos)

    if (resultado.insertedCount===0)
        throw Error("Erro ao inserir vários produtos!")

    console.log('Produtos Inserido!')
    console.log(resultado)

} catch (error) {
    console.log(error)
} finally {
    await client.close();
    process.exit(0)
}