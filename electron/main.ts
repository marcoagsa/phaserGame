import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null;

function createWindow(): void {
  mainWindow = new BrowserWindow({
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
      devTools: !app.isPackaged, // Desativa DevTools em produção
      preload: path.join(__dirname, '../../electron/preload.js'), // Arquivo de pré-carregamento
    },
  });

  // Carrega o arquivo index.html
  // mainWindow
  //   .loadFile(path.join(__dirname, '../../www/browser/index.html'))
  //   .catch((err) => {
  //     console.error('Failed to load index.html:', err);
  //     process.exit(1);
  //   });

  const appPath = app.getAppPath();
  const basePath = app.isPackaged
    ? path.join(appPath, 'www/browser')
    : path.join(__dirname, '../../www/browser');

  const indexPath = path.join(basePath, 'index.html');

  mainWindow.loadFile(indexPath).catch((err) => {
    console.error('Failed to load index.html:', err);
    // Mostra uma mensagem de erro amigável
    dialog.showErrorBox(
      'Erro',
      'Não foi possível iniciar o aplicativo. Arquivos essenciais estão faltando.'
    );
    app.quit();
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
  mainWindow.webContents.on('did-fail-load', (errorCode, errorDescription) => {
    console.error(`Failed to load: ${errorCode} - ${errorDescription}`);
    if (mainWindow) {
      mainWindow
        .loadFile(path.join(__dirname, '../../www/browser/index.html'))
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
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Encerramento do aplicativo
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC Handlers (exemplo)
ipcMain.handle('ping', () => 'pong');

// Tratamento de erros globais
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
