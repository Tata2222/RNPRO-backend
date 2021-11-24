import {Resolvers} from '../../types';
import {protectedResolver} from '../../users/users.utils';
import { processHashtags } from '../photo.utils';

const resolvers: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async(_, {id, caption},{loggedInUser, client}
    ) => {
      const oldPhoto = await client.photo.findFirst({
        where: {
          id,
          userId: loggedInUser.id,
        },
        include: {
          hashtags: {
            select: {
              hashtag: true,
            }
          }
        } 
      })
      if(!oldPhoto) {
        return {
          ok: false,
          error: "You can only edit your photos"
          
        }
      }
      await client.photo.update({
        where: {
          id,
        }, 
        data: {
          caption,
          hashtags: {
            disconnect: oldPhoto.hashtags,
            connectOrCreate: processHashtags(caption),
          }
        }
      })
      return {
        ok: true
      }
    })
  }
}

export default resolvers;