import {gql} from 'apollo-server';

export default gql`
  type LoginResponse {
    ok: Boolean!
    token: String
    error: String
  }
  type Mutation {
    login(
      userName: String!
      password: String!
    ): LoginResponse!
  }
`;