export interface User {
    id: string;
    name: string;
    email: string;
    reviews: {
        id: string;
        zooId: string;
        content: string;
        rating: number;
    };
}
