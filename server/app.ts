import 'module-alias/register';
import 'dotenv/config';
import express, { Application } from 'express';
import apiRoutes from '@/routes/api.routes';
import cors from 'cors';
import miscRoutes from '@/routes/misc.routes';

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  }),
)
app.use(express.json());

app.use('/api', apiRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export { app };