import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/auth.controller';

export async function setRoutes(fastify: FastifyInstance) {
  const authController = new AuthController();

  fastify.post('/login', authController.login.bind(authController));
  fastify.post('/register', authController.register.bind(authController));
}