import {Resolvers} from '../../types';
import { protectedResolver } from '../users.utils';

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, {userName}, {client}) => 
      client.user.findUnique({
        where: {
          userName,
        },
        include: {
          followers: true,
          following: true,
        }
      })
    )
  }
}

export default resolvers;