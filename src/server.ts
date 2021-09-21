import app from "./app";
import db from "./database";

const PORT = process.env.PORT || 3000;

db.connect().then(() => {
    app.listen(PORT, () => console.log(`Server running at ${process.env.API_URL}`));
})
