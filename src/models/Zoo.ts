import {Review} from "@/models/Review";

export interface Zoo {
    id: number;
    name: string;
    location: {
        longitude: number;
        latitude: number;
    };
    logo: string;
    description?: string;
    wikipediaLink?: string;
    address?: {
        full: string;
        city: string;
        state: string;
        country: string;
        countryCode: string;
    };
    myReview?: Review;
    recentReviews?: Review[];
    rating: number;
}
