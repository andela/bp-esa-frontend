import dotenv from 'dotenv';

dotenv.config();

const url = process.env.REACT_APP_BACKEND_URL;
const resolveUrl = () => `${url}/api/v1`;

export default resolveUrl;
