# User Account Login System

System uses a Vite React single page app system + uses serverless functions at /api/* which will be served by Vercel on deployment 

System interacts with these serverless functions for various functions

## Development Commands
Execute these commands locally to get the system working

**Terminal 1**
```
npm run dev
```

(runs the dev server for vite's frontend) - Runs on http://localhost:5500/

**Terminal 2**
```
npx vercel dev --listen 3001 
```
(runs vercel to make the serverless functions inside of /api work)


vite.config.js defines a proxy in dev to forward all requests from api/* to http://localhost:3001 where we execute our serverless functions)
