const mongoose = require('mongoose');

module.exports = {
    dbConnect: () => {
        const DB_HOST = process.env.DB_HOST
        const DB_STAGE = process.env.DB_STAGE
        const DB_PASS = process.env.DB_PASS

        const DB_URL =
            DB_STAGE && DB_PASS
                ? `mongodb://${DB_STAGE}:${DB_PASS}@${DB_HOST}/${DB_STAGE}\n`
                : `mongodb://${DB_HOST}:27017/${DB_STAGE}`;

        console.log("DB_URL ", DB_URL)

        return new Promise((resolve, reject) => {
            mongoose.connect(DB_URL)
                .then(() => {
                    resolve();
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
}