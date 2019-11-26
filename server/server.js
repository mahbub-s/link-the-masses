    
const initDb = require("./db").initDb;
const app = require('./app');

const port = process.env.PORT || 3000;

initDb(function (err) {
    if (err) throw err;
    app.listen(port, function (err) {
        if (err) throw err;
        console.log(`Listening on http://localhost:${port}`);
    });
});

module.exports = app;