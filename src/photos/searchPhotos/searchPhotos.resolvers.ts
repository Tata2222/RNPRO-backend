import {Resolvers} from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchPhoto: async (_, {keyword}, {client}) => {
    const users = await client.photo.findMany({
        where: {
          caption: {
            startsWith: keyword,
            mode: "insensitive",
          }
        }
      })
      return users;
    }
  }
} 

export default resolvers;