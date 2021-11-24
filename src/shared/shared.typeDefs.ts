import {gql} from 'apollo-server';

export default gql`
  type MutationRequest {
    ok: Boolean!
    error: String
  }
  `;