import { withFilter } from 'apollo-server';
import client from '../../client';
import { NEW_MESSAGE } from '../../constants';
import pubsub from '../../pubsub';

const resolvers = {
  Subscription: {
    roomUpdates: {
      subscribe: async(root, args, context, info) => {
        const {id} = args;
        const {loggedInUser} = context;
        const room = await client.room.findFirst({
          where: {
            id,
            users: {
              some: {
                id: loggedInUser.id
              }
            }
          },
          select: {
            id: true,
          }
        })
        if(!room) {
          throw new Error("You shall not see this")
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE),
          async ({roomUpdates}, {id}, {loogedInUser}) => {
            if(roomUpdates.roomId === id) {
              const room = await client.room.findFirst({
                where: {
                  id,
                  users: {
                    some: {
                      id: loogedInUser.id
                    },
                  },
                },
                select: {
                  id: true
                }
              })
              if(!room){
                return false
              }
              return true;
            }       
          }
        )(root, args, context, info)
      }  
    }
  }
}

export default resolvers;