import { Resolver } from 'dns';
import {Resolvers} from '../../types';
import {protectedResolver} from "../users.utils";

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectedResolver(async (_, {userName}, {loggedInUser, client}) => {
      const ok = await client.user.findUnique({where: {userName}});
      if(!ok) {
        return {
          ok: false,
          error: "That user does not exist"
        }
      }
      await client.user.update({
        where: {
          id: loggedInUser.id
        },
        data: {
          following: {
            connect: {
              userName,
            }
          }
        }
      });
      return {
        ok: true,
      };
    })
  }
}

export default  resolvers;