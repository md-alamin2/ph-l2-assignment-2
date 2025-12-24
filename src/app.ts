import express, { Request, Response } from "express"
import initDB from "./config/db";
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
const app = express();

// middleware
app.use(express.json());

// initialize DB
initDB();


// apis

app.get('/', (req: Request, res: Response) => {
  res.send('Rent your desire vehicle')
})

app.use('/api/v1/auth', authRoutes);

app.use("/api/v1/vehicles", vehicleRoutes)

app.use("/api/v1/users", userRoutes)

app.use("/api/v1/bookings", bookingRoutes)


app.use((req, res)=>{
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    errors: "API endpoint not found"
  })
})



export default app;
