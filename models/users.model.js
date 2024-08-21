const { PrismaClient, Prisma } = require('@prisma/client');
const client = new PrismaClient();

const USERS = {
  updateUser: async (id, body) => {
    try {
      let result = await client.users.update({
        where: {
          id: Number(id)
        },
        data: {
          name: body.name,
          email: body.email,
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
