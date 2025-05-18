import { hash, verify } from 'argon2';
import { PrismaClient } from '@prisma/client';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { AuthJwtPayload } from '../types/index';

export class AuthService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async validateLocalUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials!');

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) throw new UnauthorizedException('Invalid credentials!');

    return user;
  }

  async generateToken(userId: string, roleId: number) {
    const payload: AuthJwtPayload = { sub: { userId, roleId } };
    // Token generation logic here (e.g., using jsonwebtoken)
    const accessToken = ''; // Replace with actual token generation
    return { accessToken };
  }

  async registerUser(name: string, email: string, password: string) {
    const hashedPassword = await hash(password);
    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: { connect: { id: 2 } },
      },
    });

    return user;
  }
}