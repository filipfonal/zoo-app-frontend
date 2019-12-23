import gql from 'graphql-tag';

export const ISSUE_TOKEN_MUTATION = gql`
    mutation issueToken($email: String!, $password: String!) {
        issueToken(
            email: $email
            password: $password
        )
    }
`;

export const CREATE_USER_MUTATION = gql`
    mutation createUser($email: String!, $name: String!, $password: String!) {
        createUser(
            email: $email
            name: $name
            password: $password
        ){
            id,
            name,
            email
        }
    }
`;
