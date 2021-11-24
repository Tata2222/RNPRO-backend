import {gql} from 'apollo-server';

export default gql`
  type SeeFollowingQuery {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowing(userName: String!, lastId: Int): SeeFollowingQuery!
  }
`;