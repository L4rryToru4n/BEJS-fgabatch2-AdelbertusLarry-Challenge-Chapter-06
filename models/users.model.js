const { PrismaClient, Prisma } = require('@prisma/client');
const client = new PrismaClient();

const USERS = {
  getUsers: async () => {
    try{
      let result = await client.users.findMany({
        orderBy: {
          id: 'asc'
        },
        select: {
          id: true,
          name: true,
          email: true
        }
      });

      return result;
    } catch(err) {
      console.error(err.message);
      throw err;
    }
  },
  getUser: async (id) => {
    try {

      let result = await client.users.findUniqueOrThrow({
        where: {
          id: Number(id)
        },
        select: {
          id: true,
          name: true,
          email: true,
          medias: {
            select: {
              title: true
            }
          }
        }
      });
      return result;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        console.error(err.message);
      }
      throw err;
    }
  },
  createUser: async (body) => {
    try {
      let result = await client.users.create({
        data: {
          name: body.name,
          email: body.email,
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  updateUser: async (id, body) => {
    try {
      let result = await client.users.update({
        where: {
          id: Number(id)
        },
        data: {
          name: body.name,
          email: body.email
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
}

module.exports = USERS;
