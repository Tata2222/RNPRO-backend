import {Resolver} from '../types'; 
import client from '../client';
import jwt from 'jsonwebtoken'

export const getUser = async (token) => {
  try {
    if (!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({where: {id}});
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export const protectedResolver = (resolver: Resolver) => (root, args, context, info) => {
  if(!context.loggedInUser) {
    const query = info.operation.operation === "query";
    if(query) {
      return null;
    }
    return {
      ok: false,
      error: "Please log in to perform this action."
    };
  }
  return resolver(root, args, context, info);
}