import jsonServer from 'json-server';
import cors from 'cors';

const server = jsonServer.create();
const router = jsonServer.router('public/data/clean_folktales.json');
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(middlewares);
server.use('/api', router);

const PORT = process.env.PORT || 60411;
server.listen(PORT, () => {
  console.log(`✅ JSON Server with CORS is running on http://127.0.0.1:${PORT}`);
});

