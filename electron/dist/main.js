"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
let mainWindow;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 390,
        height: 844,
        show: false, // Esconde até estar pronto
        backgroundColor: '#2e2c29',
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            webSecurity: true,
            allowRunningInsecureContent: false,
            devTools: !electron_1.app.isPackaged, // Desativa DevTools em produção
            preload: path_1.default.join(__dirname, '../../electron/preload.js'), // Arquivo de pré-carregamento
        },
    });
    // Carrega o arquivo index.html
    mainWindow
        .loadFile(path_1.default.join(__dirname, '../../www/browser/index.html'))
        .catch((err) => {
        console.error('Failed to load index.html:', err);
        process.exit(1);
    });
    // Eventos da janela
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    // Mostra quando estiver pronto
    mainWindow.on('ready-to-show', () => {
        if (mainWindow) {
            mainWindow.show();
            // if (!app.isPackaged) {
            //   mainWindow.webContents.openDevTools({ mode: 'detach' });
            // }
        }
    });
    // Tratamento de erros de carregamento
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
        console.error(`Failed to load: ${errorCode} - ${errorDescription}`);
        if (mainWindow) {
            mainWindow
                .loadFile(path_1.default.join(__dirname, '../../www/browser/index.html'))
                .catch((err) => console.error('Retry load failed:', err));
        }
    });
    // Monitora memória (apenas para desenvolvimento)
    // if (!app.isPackaged) {
    //   setInterval(() => {
    //     console.log('Memory usage:', process.memoryUsage());
    //   }, 5000);
    // }
}
// Configuração do aplicativo
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
// Encerramento do aplicativo
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// IPC Handlers (exemplo)
electron_1.ipcMain.handle('ping', () => 'pong');
// Tratamento de erros globais
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
