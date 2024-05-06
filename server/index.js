import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import errorMiddleware from "./middleware/error.middleware.js";

import userRouter from "./routes/userRoutes.js";
import servicesRouter from "./routes/servicesRoutes.js";
import reviewsRouter from "./routes/reviewsRoutes.js";
import masterRouter from "./routes/masterRoutes.js";
import appointmentsRouter from "./routes/appointmentsRoutes.js";
import newsRouter from "./routes/newsRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use("/user", userRouter);
app.use("/services", servicesRouter);
app.use("/reviews", reviewsRouter);
app.use("/master", masterRouter);
app.use("/appointments", appointmentsRouter);
app.use("/news", newsRouter);

app.use(errorMiddleware);

const start = () => {
  try {
    app.listen(PORT, () => console.log(`server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
