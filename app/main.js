const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const axios = require('axios')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    frame: 'true',
    icon: __dirname + "/logo.jpeg",
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      color: '#2f3241',
      symbolColor: '#74b1be',
      height: 30
    },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.on('set-table', async (event, table) => {
    if (table.select === 'mesa') {
      await axios.post(`https://developers.abrahao.com.br/api/v1/table`, {
        code: table.code,
        name: table?.name ? table?.name : null,
        service_percentage: table?.fee ? table?.fee : 0
      }, {
        headers: {
          Authorization: `Bearer ${table.token}`
        }
      })
      return
    }

    if (table.select === 'comanda') {
      await axios.post(`https://developers.abrahao.com.br/api/v1/card`, {
        code: table.code,
        name: table?.name ? table?.name : null,
        service_percentage: table?.fee ? table?.fee : 0
      }, {
        headers: {
          Authorization: `Bearer ${table.token}`
        }
      })
      return
    }
  })

  ipcMain.on('set-title', async (event, title) => {
    const webContents = event.sender
    const final = +title.final + 1
    if (title.select === 'mesa') {
      console.log("Escolheu mesa")
      for (var i = title.initial; i < final; i++) {
        //YGbMNkeMkXe9FIOkmKCqkqf-cpCkTChb
        await axios.delete(`https://developers.abrahao.com.br/api/v1/table/${i}`, {
          headers: {
            Authorization: `Bearer ${title.token}`
          }
        })
      }
      window.alert('teste')
      return
    }

    if (title.select === 'comanda') {
      console.log("Escolheu comanda")

      for (var i = title.initial; i < final; i++) {
        await axios.delete(`https://developers.abrahao.com.br/api/v1/card/${i}`, {
          headers: {
            Authorization: `Bearer ${title.token}`
          }
        })
      }
      return
    }

    //console.log(title.token, title.select, title.initial, title.final)
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(async () => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})