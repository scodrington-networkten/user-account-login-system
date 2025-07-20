# Interactive Movie Search

A Single Page Web App, powered by Vite + React that uses themoviedb API to pull in upcoming and recent movies.

This system utilises Vercel node.js serverless functions, sitting under the /api directory to perform various API
actions against the endpoint, along with
updating internal actions such as adding movies to a users favorites / watch list.

## Project Summary

This project utilises the following tech

- Tailwind 4 (CSS framework)
- TypeORM (for creating and managing records in the postgres DB running on neon)
- Vite project base with React 19 (focusing on hooks)

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

(runs vercel to make the serverless functions inside of /api )

vite.config.js defines a proxy in dev to forward all requests from api/* to http://localhost:3001 where we execute our
serverless functions)
