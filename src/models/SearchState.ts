import {City} from '@/models/City';
import {Zoo} from '@/models/Zoo';

export interface SearchState {
    cities: City[];
    zoos: Zoo[];
}
