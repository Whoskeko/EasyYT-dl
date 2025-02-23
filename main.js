const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const { stdout, stderr } = require('process');

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL('https://youtube.com');
});

ipcMain.handle('download-video', async (event, url, format) => {
  const command = `yt-dlp -f ${format} -o '~/Descargas/%(title)s.%(ext)s' ${url}`;
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if(error) reject(stderr);
      else resolve(stdout);
    });
  });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
