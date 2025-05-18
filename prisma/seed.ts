import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

export const roles = [
  {
    id: 1,
    name: 'Administrador',
  },
  {
    id: 2,
    name: 'Cliente',
  },

];

export const permissions = [
  // Admin: acesso total
  {
    id: 1,
    role_id: 1,
    action: 'manage',
    subject: 'all',
  },
  // Cliente: acesso total a algumas entidades
  {
    id: 2,
    role_id: 2,
    action: 'manage',
    subject: 'Credito',
  },

  // Cliente: acesso parcial a User
  {
    id: 3,
    role_id: 2,
    action: 'read',
    subject: 'User',
  },
  {
    id: 4,
    role_id: 2,
    action: 'update',
    subject: 'User',
  },
];

async function main() {
  for await (const role of roles) {
    const roleAttrs = structuredClone(role) as { id?: number; name: string };
    delete roleAttrs.id;
    await prisma.role.upsert({
      where: {
        id: role.id,
      },
      create: roleAttrs,
      update: roleAttrs,
    });
  }

  for await (const permission of permissions) {
    const permissionAttrs = structuredClone(permission) as { id?: number; role_id: number; action: string; subject: string };
    delete permissionAttrs.id;
    await prisma.permission.upsert({
      where: {
        id: permission.id,
      },
      create: permissionAttrs,
      update: permissionAttrs,
    });
  }

  const adminDev = {
    name: 'jvras',
    email: 'jvras@cin.ufpe.br',
    bio: 'Desenvolvedor Administrador.',
    image: faker.image.avatar(),
    password: await hash('123456'),
    role_id: 1,
  };

  const adminUser = {
    name: 'CIN',
    email: 'cin@cin.ufpe.br',
    bio: 'Administrador do sistema com acesso total.',
    image: faker.image.avatar(),
    password: await hash('123456'),
    role_id: 1,
  };

  await prisma.user.createMany({
    data: [adminDev, adminUser],
  });
}

main()
  .then(() => {
    prisma.$disconnect();
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });