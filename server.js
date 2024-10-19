import app from "./app.js";
import db from "./database/conexionMongo.js";

app.listen(process.env.PORT, async () => {
	try {
		await db();
		console.log(`Puerto: ${process.env.PORT}`);
	} catch (error) {
		console.log(`Error: ${error}`);
	}
});
