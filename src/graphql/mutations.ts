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

export const UPDATE_REVIEW_MUTATION = gql`
    mutation updateReview($id: String!, $rating: Int!, $content: String!) {
        updateReview(
            id: $id
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

export const ADD_FAVOURITE_MUTATION = gql`
    mutation addFavourite($zooId: String!) {
        addFavourite(
            zooId: $zooId
        ){
            id
            user {
                id
                name
                email
            }
            zooId
            createdAt
        }
    }
`;

export const ADD_FRIEND_MUTATION = gql`
    mutation addFriend($email: String!) {
        addFriend(
            email: $email
        ){
            id
            name
            email
        }
    }
`;

export const REMOVE_FRIEND_MUTATION = gql`
    mutation removeFriend($email: String!) {
        removeFriend(
            email: $email
        )
    }
`;
