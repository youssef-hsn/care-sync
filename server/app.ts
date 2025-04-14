import express, { Application, Request, Response } from 'express';
import apiRoutes from '@/routes/api.routes';

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', apiRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, server };