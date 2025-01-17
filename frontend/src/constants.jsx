export const BASE_URL = window.env.VITE_BACKEND_URL;

//export const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// http://localhost:5000/api
// Backend ip
// private ip: http://172.31.24.179:5000/api
// public ip: http://13.215.49.208:5000/api
// docker run -d -p 3000:80 -e VITE_BACKEND_URL="http://13.215.49.208:5000/api" --name frontend simple_note/frontend