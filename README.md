# Google CrUX API Backend

A Node.js backend service for querying Google Chrome UX Report (CrUX) data.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=3000
   GOOGLE_API_KEY=your_api_key_here
   ```

## Development

Run the development server:
```bash
npm run dev
```

## Production

Run the production server:
```bash
npm start
```

## API Endpoints

- `GET /` - Welcome message and API information
- `POST /getRecords` - Query Google CrUX data

## Deployment

This application can be deployed to Render.com:

1. Create a Render account
2. Connect your GitHub repository
3. Create a new Web Service
4. Configure the service:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Add environment variables:
   - `GOOGLE_API_KEY`: Your Google CrUX API key
   - `NODE_ENV`: production
   - `PORT`: 10000

## Environment Variables

- `PORT`: Server port (default: 3000)
- `GOOGLE_API_KEY`: Your Google CrUX API key
- `NODE_ENV`: Environment (development/production) 