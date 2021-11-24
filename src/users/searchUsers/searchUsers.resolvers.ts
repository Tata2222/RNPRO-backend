import {Resolvers} from '../../types';

const resolvers: Resolvers = {
  Query: {
    searchUsers: async (_, {keyword}, {client}) => {
    const users = await client.user.findMany({
        where: {
          userName: {
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