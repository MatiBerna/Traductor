"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const Traduction_1 = require("./models/Traduction");
const bing_translate_api_1 = require("bing-translate-api");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
app.get('/traducciones', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const traducciones = yield Traduction_1.Traduction.findAll();
    const translatedTraducciones = yield Promise.all(traducciones.map((traduction) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, bing_translate_api_1.translate)(traduction.text, 'en', 'es');
        if (result) {
            const newTraduction = yield Traduction_1.Traduction.create({
                id: traduction.id,
                text: result.translation,
                language: 'español',
            });
            return newTraduction;
        }
        return traduction;
    })));
    res.json(translatedTraducciones);
}));
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    (0, database_1.startDb)();
}));
