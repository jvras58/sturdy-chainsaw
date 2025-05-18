import Fastify, { FastifyInstance } from 'fastify';
import authRoutes from './routes/auth.routes';
import { configServerOption } from './config/serverconfig';
import prismaPlugin from './plugins/prisma';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const startServer = async () => {
  const serverOptions = await configServerOption();
  const app: FastifyInstance = Fastify(serverOptions);

  // Register Swagger
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'Fastify REST API',
        description: 'A simple REST API built with Fastify and Prisma',
        version: '0.0.1',
      },
      servers: [{ url: `http://localhost:${port}` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  });
  // Register JWT for authentication
  await app.register(require('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'supersecret',
  });

  // Register Swagger UI
  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
    },
  });

  // Register Prisma plugin
  await app.register(prismaPlugin);

  // Register routes
  await app.register(authRoutes, { prefix: '/api/auth' });

  // Health check route
  app.get('/', {
    schema: {
      description: 'Root Health Check',
      tags: ['General'],
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: async (_request, reply) => {
      reply.send({ message: 'API ONLINE!' });
    },
  });

  try {
    await app.listen({ port });
    app.log.info(`Server running at http://localhost:${port}/`);
    app.log.info(`Swagger UI available at http://localhost:${port}/docs`);
  } catch (err) {
    app.log.error('Error starting server:', err);
    process.exit(1);
  }
};

startServer();