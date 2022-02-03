const express = require("express")
const db = require("./lib/db.js");

let app = express();
const server = app.listen(process.env.PORT || 8080, () => {console.log("Listening on port 8080")});

require("./scouting/scouting-sync.js")(server);

app.set("view engine", "ejs");
let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use("/", require("./scouting/scouting.js"));
app.use("/analysis", require("./analysis/analysis.js"));
app.use("/admin", require("./admin/admin.js"));