import { uploadToS3 } from '../../shared/share.utils';
import {Resolvers} from '../../types';
import { protectedResolver } from '../../users/users.utils';
import { processHashtags } from '../photo.utils';

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: 
    protectedResolver(async (_, {file, caption}, {loggedInUser, client}) => {
      const hashtagsObj = !!caption ? processHashtags(caption): [];
      const fileUrl = await uploadToS3(file, loggedInUser.id, "uploads");
      return await client.photo.create({
        data: {
          file: fileUrl,
          caption, 
          user: {
            connect: {
              id: loggedInUser.id
            }
          },       
          ...(hashtagsObj.length > 0 && {hashtags: hashtagsObj})
        }
      })   
    })
  }
}

export default resolvers;