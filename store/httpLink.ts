import { createHttpLink } from '@apollo/client';
import { API_URL } from "@env";

export const httpLink = createHttpLink({
    uri: API_URL,
});
