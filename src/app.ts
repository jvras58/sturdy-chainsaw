import fastify from 'fastify';
import { setRoutes } from './routes/auth.routes';
import prismaPlugin from './plugins/prisma';

const app = fastify({ logger: true });

app.register(prismaPlugin);
setRoutes(app);

app.listen(3000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});