import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());

app.get('/status', (req: Request, res: Response) => {
  res.json({ 
    status: 'ok',
    message: "Server is up",
    timestamp: new Date().toISOString() 
    });
});

export default app;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});