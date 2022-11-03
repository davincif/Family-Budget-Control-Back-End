import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors, { CorsOptions } from "cors";

// manual initializaitons
const app = express();

app.get("/", function (req, res) {
  const answer = "Lock'n'load, sir! 🤖";
  res.status(200).send(answer);
  console.info(answer);
});

const server = app.listen(process.env.PORT);
initializeManualMiddlewares({
  origin: process.env.CORS_ORIGINS?.split(",").map((origin) => origin.trim()),
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
});

server.on("listening", () => {
  console.info(`🪖 Captan! Waiting orders on port ${process.env.PORT} 🫡`);
});

function initializeManualMiddlewares(corsOptions: CorsOptions) {
  console.log("corsOptions", corsOptions);
  app.use(cors(corsOptions));
}
