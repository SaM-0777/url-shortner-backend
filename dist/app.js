"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const auth_1 = __importDefault(require("./routes/auth"));
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '..', '.env') });
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = (0, express_1.default)();
// middleware
app.use(express_1.default.json({ type: 'application/json' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use((0, morgan_1.default)("dev"));
// routes
app.use("/auth", auth_1.default);
app.use("/api", api_1.default);
app.get("/", (req, res) => {
    res.status(404).send("<h1>404</h1>");
});
// DB config
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(`${MONGO_URI}`, function () {
    app.listen(PORT, function () {
        console.log("server is listening on port ", PORT);
    });
});
mongoose_1.default.connection.on("disconnected", () => console.log("MongoDB Disconnected"));
