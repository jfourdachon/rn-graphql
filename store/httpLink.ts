import { createHttpLink } from '@apollo/client';
import { API_URL } from "react-native-dotenv";

export const httpLink = createHttpLink({
    uri: API_URL,
});
