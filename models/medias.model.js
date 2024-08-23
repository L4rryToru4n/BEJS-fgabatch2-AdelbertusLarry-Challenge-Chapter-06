const { PrismaClient, Prisma } = require('@prisma/client');
const client = new PrismaClient();

const MEDIAS = {
  getMedias: async (user_id) => {
    try {
      let result = await client.medias.findMany({
        where: {
          user_id: Number(user_id)
        },
        orderBy: {
          id: 'asc'
        },
        select: {
          id: true,
          type: true,
          url: true,
          title: true,
          description: true
        }
      });

      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  getMedia: async (user_id, id) => {
    try {
      let result = await client.medias.findUniqueOrThrow({
        where: {
          user_id: Number(user_id),
          id: Number(id)
        },
        select: {
          id: true,
          imagekit_fileId: true,
          type: true,
          url: true,
          title: true,
          description: true
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
  updateMedia: async (user_id, id, body) => {
    try {
      let title = body.title;
      let description = body.description;

      let result = await client.medias.update({
        where: {
          user_id: Number(user_id),
          id: Number(id)
        },
        data: {
          title: title,
          description: description
        }
      });

      return result;
    }
    catch (err) {
      if (err instanceof Prisma.PrismaClientValidationError) {
        console.error(err.message);
      }
      throw err;
    }
  },
  uploadMedia: async (user_id, body) => {
    try {
      let result = await client.medias.create({
        data: {
          user_id: Number(user_id),
          imagekit_fileId: String(body.imagekit_fileId),
          type: body.type,
          url: body.url,
          title: body.title,
          description: body.description
        }
      });
      return result;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  },
  deleteMedia: async (user_id, id) => {
    try {
      await client.medias.delete({
        where: {
          user_id: Number(user_id),
          id: Number(id)
        }
      });
    }
    catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}

module.exports = MEDIAS;
