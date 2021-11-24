import {Resolvers} from '../../types';

const resolvers: Resolvers = {
  Query: {
    seePhotoComments: async (_, {id, lastId}, {client}) => {
      return await client.comment.findMany({
        where: {
          photoId: id,
        }, 
        orderBy: {
          createdAt: "asc"
        },
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && {cursor: {id: lastId}}),  
      })
    }
  }
}

export default resolvers;