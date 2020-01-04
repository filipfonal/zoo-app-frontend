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

export const FIND_NEARBY_ZOOS = gql`
    query findNearbyZoos($longitude: Float!, $latitude: Float!, $range: Int!) {
        findNearbyZoos(longitude: $longitude, latitude: $latitude, range: $range){
            id
            name
            location {
                longitude
                latitude
            }
            description
            logo
            rating
        }
    }
`;

export const GET_SINGLE_ZOO = gql`
    query zoo($id: Int!) {
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
