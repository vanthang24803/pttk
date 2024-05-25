"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import { Connection } from '@/lib/prisma';
const app = (0, express_1.default)();
// TODO : Settings
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use('/api/v1', router);
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Hello World');
});
// Connection();
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
