import express, { Request, Response } from "express"
import config from "./config"
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
const app = express();

const port = config.port;

// middleware
app.use(express.json());

// initialize DB
initDB();


// apis

app.use('/api/v1/auth', authRoutes);

app.use("/api/v1/users", userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.send('Rent your desire vehicle')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
