const Task = require('./Task.js');
const CleanUp = require('./task/CleanUp.js');
const GenerateHTML = require('./task/GenerateHTML.js');
const GenerateSiteMap = require('./task/GenerateSiteMap.js');
const GenerateServiceWorker = require('./task/GenerateServiceWorker.js');
const GenerateManifest = require('./task/GenerateManifest.js');
const OptimizeImg = require('./task/OptimizeImg.js');
const GenerateOGPImage = require('./task/GenerateOGPImage.js');
const GenerateStaticAssets = require('./task/GenerateStaticAssets.js');
const PrepareDebugEnv = require('./task/PrepareDebugEnv.js');

module.exports = class TaskRunner extends Task {
  run() {
    this.log('======================');
    this.log('       GEN SITE       ');
    this.log('======================');
    this.add(new CleanUp());
    this.add(new GenerateHTML());
    this.add(new GenerateSiteMap());
    this.add(new GenerateServiceWorker());
    this.add(new GenerateManifest());
    this.add(new OptimizeImg());
    this.add(new GenerateOGPImage());
    this.add(new GenerateStaticAssets());
    this.add(new PrepareDebugEnv());
    this.runAll();
    this.log('======================');
    this.log(' ');
  }
};
