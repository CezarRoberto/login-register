import express from "express";
import { createConnection } from "typeorm";
import "reflect-metadata";
import { User } from "./entities/User";
import bodyParser from "body-parser";
import { UserRouter } from "./routes/UserRouter";
import { AuthRouter } from "./routes/AuthRouter";
const app = express();

async function main() {
  try {
    const connection = await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "123456",
      database: "chat2desk-skills",
      entities: [User],
      synchronize: true,
      logging: false,
    });
    if (connection) {
      console.log("Connected Sucessful");
    }
    app.use(bodyParser.json());
    app.use(AuthRouter)
    app.use(UserRouter);
  } catch (error) {
    console.log(error);
  }

  app.listen(8080, () => {
    console.log("Server up!");
  });
}

main();
