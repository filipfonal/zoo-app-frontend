export interface Review {
    id: string;
    user: {
        id: string;
        name: string;
        email: string;
    },
    zooId: string;
    rating: number;
    content: string;
    createdAt: string;
}
