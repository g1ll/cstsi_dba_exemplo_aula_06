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
            id_prod: 136,
            nome: " AMD Radeon RX 6600 ",
            descricao: "XFX Speedster SWFT 210 AMD Core Gaming, 8GB GDDR6,RDNA 2 ",
            importado: true,
            preco: 3500,
            qtd_estoque: 150
        },
        {
            id_prod: 137,
            nome: "Smartphone Motorola Moto Edge 30 Pro,",
            descricao: "Moto Edge 5G, 12GB RAM, 256GB, Câmera Tripla 50MP, Tela Max Vision 6.7, Branco",
            importado: true,
            preco: 5800,
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