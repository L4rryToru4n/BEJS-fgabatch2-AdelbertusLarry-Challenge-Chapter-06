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
          email: true,
          image_url: true,
          video_url: true,
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
          image_url: true,
          video_url: true,
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
          email: body.email,
          image_title: body.title,
          image_description: body.description,
          image_url: body.image_url,
          video_url: body.video_url
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
