import gql from "graphql-tag";
import { apolloClient } from "../config/apollo";

export default function getProject() {
  const projects = apolloClient.query({
    query: gql`
      query {
        projects {
          projectName
        }
      }
    `,
  });
  return projects;
}
