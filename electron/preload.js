const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  ping: () => ipcRenderer.invoke("ping"),
  platform: process.platform,
  versions: process.versions,
  // Adicione outras APIs seguras conforme necessário
});
