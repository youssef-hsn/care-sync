import express, { Application, Request, Response } from 'express';

const app: Application = express();
const PORT: number | string = process.env.PORT || 3000;

app.use(express.json());

app.get('api/test', (req: Request, res: Response) => {
  res.send('Server is up and running');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});