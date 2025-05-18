import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from '../services/auth.service';
import { SignInInput } from '../types/index';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(request: FastifyRequest<{ Body: SignInInput }>, reply: FastifyReply) {
    try {
      const { email, password } = request.body;
      const user = await this.authService.validateLocalUser({ email, password });
      const token = await this.authService.generateToken(user.id, user.role_id);
      reply.send({ user, token });
    } catch (error) {
      reply.status(401).send({ message: error.message });
    }
  }

  async register(request: FastifyRequest<{ Body: SignUpInput }>, reply: FastifyReply) {
    try {
      const user = await this.authService.registerUser(request.body);
      reply.status(201).send(user);
    } catch (error) {
      reply.status(400).send({ message: error.message });
    }
  }
}