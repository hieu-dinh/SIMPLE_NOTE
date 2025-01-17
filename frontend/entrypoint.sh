#!/bin/sh

# Generate the env.js file dynamically
echo "window.env = { VITE_BACKEND_URL: '${VITE_BACKEND_URL}' };" > /usr/share/nginx/html/env.js

# Start Nginx
exec nginx -g "daemon off;"