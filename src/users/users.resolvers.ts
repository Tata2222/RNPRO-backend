import client from '../client';

export default {
  User: {
    totalFollowing: ({id}) => 
    client.user.count({where: {
      followers: {
        some: {
          id
        }
      }
    }}),
    totalFollowers: ({id}) => 
    client.user.count({where: {
      following: {
        some: {
          id
        }
      }
    }}),
    isMe: ({id}, _, {loggedInUser}) => {
      if(!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id
    },
    isFolowing: ({id}, _, {loggedInUser}) => {
      if(!loggedInUser) {
        return false;
      }
      const exist = client.user.count({
        where: {
          userName: loggedInUser.userName,
          following: {
            some: {
              id
            }
          }
        }
      })
      return Boolean(exist);
    },
    photos: ({id}) => {
      client.user.findUnique({
        where: {
          id
        }
      }).photos()
    }
  }
}