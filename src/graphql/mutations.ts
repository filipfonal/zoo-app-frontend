import gql from 'graphql-tag';

export const ISSUE_TOKEN_MUTATION = gql`
    mutation issueToken($email: String!, $password: String!) {
      issueToken(
          email: $email
          password: $password
      )
    }
`;
