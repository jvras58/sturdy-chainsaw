import Fastify, { FastifyInstance } from 'fastify';
import { FastifyRequest, FastifyReply } from 'fastify';
// import { fastifyCors } from '@fastify/cors';
import authRoutes from './routes/auth.routes';
import { configServerOption } from './config/serverconfig';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const startServer = async () => {
  const serverOptions = await configServerOption();
  const app: FastifyInstance = Fastify(serverOptions);

  // app.register(fastifyCors, {
  //   origin: '*',
  //   methods: ['GET', 'POST'],
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  // });

  // Registro das rotas com prefixos
  app.register(authRoutes, { prefix: '/api/auth' });

  // Exemplo de rota GET com tipagem correta
  app.get('/', async (_request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: 'Hello, World!' });
  });

  try {
    await app.listen({ port });
    app.log.info(`Server running at http://localhost:${port}/`);
  } catch (err) {
    app.log.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();