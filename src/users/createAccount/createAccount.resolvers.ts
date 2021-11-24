import {Resolvers} from '../../types';
import bcrypt from 'bcrypt';

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async(_,{
      firstName, lastName, userName, email, password
    }, {client}) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { 
            OR: [
              {
                userName
              },
              {
                email
              }
            ],
          }
        })
        if(existingUser) {
          throw new Error("This usename/email is already taken")
        }
        const hashPassword = await bcrypt.hash(password, 10);
        await client.user.create({data: {
          userName,
          email,
          firstName,
          lastName,
          password: hashPassword,
        }})
        return {
          ok: true,
        }
      } catch(e) {
        return {
          ok: false,
          error: "Can't create account",
        }
      }
    }
  }
}

export default resolvers;