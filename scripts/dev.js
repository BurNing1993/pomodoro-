//@ts-check
const webpack = require('webpack')
const { spawn } = require('child_process')
const electron = require('electron')
const path = require('path')
const config = require('../config/webpack.main.config')

const ROOT = path.resolve(__dirname, '../')
const now = () => `[${new Date().toLocaleString()}]`

/** @type import('child_process').ChildProcess  */
let electronProcess

const compiler = webpack({
  ...config,
  mode: 'development',
})

const watching = compiler.watch(
  {
    aggregateTimeout: 3000,
    poll: undefined,
  },
  (err, stats) => {
    if (err || stats.hasErrors()) {
      console.error('Error', err)
      process.exit()
    } else {
      console.log(now(), stats.toJson('summary'))
      startElectron()
    }
  }
)

function startElectron() {
  console.log(now(), 'start electron')
  if (electronProcess != null) {
    // windows 上，不支持 signal 参数
    electronProcess.kill()
    // electronProcess = null
  }
  // @ts-ignore
  electronProcess = spawn(electron, [path.join(ROOT, 'dist/main.js')])
  // electronProcess.stdout.on('data', (data) => {
  //   logger.info(data.toString(), defaultLogOptions)
  // })
  electronProcess.stderr.on('data', (data) => {
    console.log(now(), data.toString())
  })
  electronProcess.on('close', (code) => {
    watching.close(() => {
      console.log(now(), `child process exited with code ${code}`)
    })
  })
}
