import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

// Vamos user um RouteStart em que o servidor não desliga totalmente a cada requisição
// isso ajuda pois se tem um grande volume de requisições, fode.

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  //RouteSTART
  if (cachedDb) {
    return cachedDb;
  }

  // dá acesso ao cluster
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default async (request: NowRequest, response: NowResponse) => {
  const { email } = request.body;

  // inserção

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('subscribers'); //nome da tabela

  await collection.insertOne({
    email,
    subscribedAt: new Date(),
  });

  return response.status(201).json('Paranbéns');
}