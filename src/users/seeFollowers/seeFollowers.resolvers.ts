import {Resolvers} from '../../types';

const resolvers: Resolvers = {
  Query: {
    seeFollowers: async(_, {userName, page}, {client}) => {
      const ok = await client.user.findUnique({
        where: {userName}, 
        select: {id: true }
      });
      if(!ok) {
        return {
          ok: false,
          error: "User not found",
        }
      }
      const followers = await client.user.findUnique({
        where: {
       userName
        }
      }).followers({
        take: 5,
        skip: (page-1) * 5
      })
    
      return {
        ok: true,
        followers
      }
    }
  }
}

export default resolvers;