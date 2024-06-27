import app from "./app.js";
import db from "./database/conexionMongo.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    try {
      await db();
      console.log(`Puerto: ${process.env.PORT}`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  })
  