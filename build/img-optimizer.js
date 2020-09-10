const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const fs = require('fs');
module.exports = class ImgOptimizer {
  async reize(targetPath, distPath) {
    fs.readdirSync(targetPath)
      .filter((file) => {
        return file.toLocaleLowerCase().endsWith('.jpg') ||
          file.toLocaleLowerCase().endsWith('.png');
      }).map(async (file) => {
        const width = parseInt(file.match(/(\d+)w/)[1]);
        await sharp(`${targetPath}${file}`)
          .resize(width)
          .toFile(`${distPath}${file}`);
      });
  }
  async min(targetPath, distPath) {
    await imagemin([targetPath], distPath, {
      use: [
        imageminMozjpeg({quality: 80}),
      ],
    });
  }
  async reizeSingle(targetFullPath, distFullPath, width, height) {
    await sharp(targetFullPath)
          .resize(width, height)
          .toFile(distFullPath);
  }
};
