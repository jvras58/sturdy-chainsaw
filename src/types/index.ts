import '@fastify/jwt';

declare module 'fastify' {
  interface FastifyInstance {
    jwt: import('@fastify/jwt').JWT;
  }
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthJwtPayload {
  sub: {
    userId: string;
    roleId: number;
  };
}

export interface UserResponse {
  id: string;
  name: string;
  avatar?: string;
  accessToken: string;
  roleId: number;
  email: string;
}

export interface JwtUser {
  id: string;
  roleId: number;
}