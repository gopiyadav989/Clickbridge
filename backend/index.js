import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import clickhouseRoutes from './routes/clickhouse.js';
import flatFileRoutes from './routes/flatFile.js';

dotenv.config({ path: './backend/.env' });

const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Ensure uploads directory exists
import fs from 'fs';
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Routes
app.use('/api/clickhouse', clickhouseRoutes);
app.use('/api/flatfile', flatFileRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 