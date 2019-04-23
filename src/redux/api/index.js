import dotenv from 'dotenv';

dotenv.config();

const { REACT_APP_BACKEND_URL } = process.env;
const resolveUrl = () => `${REACT_APP_BACKEND_URL}/api/v1`;

export default resolveUrl;
