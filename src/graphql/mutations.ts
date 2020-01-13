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

export const POST_REVIEW_MUTATION = gql`
    mutation postReview($zooId: String!, $rating: Int!, $content: String!) {
        postReview(
            zooId: $zooId
            rating: $rating
            content: $content
        ){
            id
            user {
                id
                name
                email
            }
            zooId
            rating
            content
            createdAt
        }
    }
`;

export const DELETE_REVIEW_MUTATION = gql`
    mutation deleteReview($id: String!) {
        deleteReview(
            id: $id
        )
    }
`;
