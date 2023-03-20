const mongoose = require("mongoose");

const dbConection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        });

        console.log("Db en linea...");
    } catch (error) {
        console.log("Error al iniciar la DB:", error);
        throw new Error("Error al inicializar la db/..");
    }
}

module.exports = {
    dbConection
};