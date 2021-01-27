import gql from "graphql-tag";
import { apolloClient } from "../config/apollo";

export default function getallUser() {
  const users = apolloClient.query({
    query: gql`
      query Users {
        users {
          id
          name
          email
          image {
            id
            fullPath
          }
        }
      }
    `,
  });

  return users;
}
