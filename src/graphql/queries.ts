import gql from 'graphql-tag';

export const FIND_CITIES_QUERY = gql`
    query findCities($query: String!) {
        findCities(query: $query){
            name,
            fullName
            location {
                longitude
                latitude
            }
        }
    }
`;

export const GET_AUTH_DATA_MUTATION = gql`
    query getAuthData {
        me {
            id,
            name,
            email
        }
    }
`;

export const FIND_NEARBY_ZOOS = gql`
    query findNearbyZoos($longitude: Float!, $latitude: Float!, $range: Int!) {
        findNearbyZoos(longitude: $longitude, latitude: $latitude, range: $range){
            id
            name
            location {
                longitude
                latitude
            }
            logo
            rating
        }
    }
`;

export const GET_SINGLE_ZOO = gql`
    query zoo($id: String!) {
        zoo(id: $id){
            id
            name
            location {
                longitude
                latitude
            }
            description
            logo
            wikipediaLink
            address {
                full
                city
                state
                country
                countryCode
            }
            myReview {
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
            recentReviews {
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
            rating
        }
    }
`;

export const GET_SINGLE_USER = gql`
    query user($id: String!) {
        user(id: $id) {
            id
            name
            email
            reviews {
                id
                zooId
                content
                rating
            }
        }
    }
`;
