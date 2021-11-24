require("dotenv").config();
import http from 'http';
import express from 'express';
import logger from 'morgan';
import {ApolloServer} from 'apollo-server-express'
import {typeDefs, resolvers} from './schema';
import client from './client';
import {getUser} from './users/users.utils';

type Params = {
  authorization: string;
}
const PORT = process.env.PORT

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  context: async (ctx) => {
    if(ctx.req) {     
      return {
        loggedInUser: await getUser(ctx.req.headers.authorization),
        client,
      }
    } else {
      const {connection:  {context}} = ctx;
      return {
        loggedInUser: context.loggedInUser,
      }
    }
  },
  subscriptions: {
    onConnect: async (params: Params) => {
      const {authorization} = params
      if(!authorization) {
        throw new Error("You can't listen")
      } 
      const loggedInUser = await getUser(authorization);
      return {
        loggedInUser,
      }
    }
  }
});
//apollo.start();
const app = express();
app.use(logger("tiny"));
//app.use("/static", express.static("uploads"));
apollo.applyMiddleware({app});

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);
httpServer.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});