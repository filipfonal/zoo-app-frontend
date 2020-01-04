export interface Zoo {
    id: number;
    name: string;
    location: {
        longitude: number;
        latitude: number;
    };
    description: string;
    logo: string;
    wikipediaLink: string;
    address: {
        full: string;
        city: string;
        state: string;
        country: string;
        countryCode: string;
    };
    rating: number;
}
