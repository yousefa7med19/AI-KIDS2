# AI Kids Backend

## Step 1: Run the API locally

Requirements: Node.js 18 or newer.

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Open:

- `http://localhost:5000/`
- `http://localhost:5000/api/health`

Expected health response:

```json
{
  "success": true,
  "message": "AI Kids API is running"
}
```

The MongoDB and JWT values are placeholders in this step. They will be activated when authentication is added.
