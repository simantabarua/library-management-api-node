import { app } from "./app";
import connectDB from "./config/db";
import { config } from "./config/env";

async function main() {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`server is running on port ${config.port}`);
  });
}
main();
