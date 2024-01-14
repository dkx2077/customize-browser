
const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')
const contextMenu = require('electron-context-menu');

contextMenu({
	prepend: (defaultActions, params, BrowserWindow) => [
		{
			label: 'jiamimao.ga :)',
			
			visible: params.mediaType === 'image'
		}
	]
});

let mainWindow;


function createWindow () {
  
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')


  
  mainWindow.on('closed', function () {
   
    app.quit();
  })
}


app.on('ready', createWindow)


app.on('window-all-closed', function () {
  
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  
  if (mainWindow === null) createWindow()
})


const template = [
  
  ...(process.platform === 'darwin' ? [{
    label: app.getName(),
    submenu: [
      { role: 'quit' }
    ]
  }] : [])
];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)


