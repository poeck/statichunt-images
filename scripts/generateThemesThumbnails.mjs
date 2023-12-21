import fs from "fs";
import path from "path";
import sharp from "sharp";

const imagesFolder = path.join(process.cwd(), "/themes/");
const thumbnailsFolder = path.join(process.cwd(), "/themes/thumbnails/");
const thumbnailHeight = 286;
const thumbnailWidth = 430;

// generate thumbnail
const generateThumbnail = async (file) => {
  const themeKey = file.replace(".png", "");
  const hiresImage = path.join(imagesFolder, `${themeKey}.png`);
  const outputImage = path.join(thumbnailsFolder, `${themeKey}.webp`);

  // if thumbnail already exists, skip
  if (fs.existsSync(outputImage)) {
    return false;
  }

  sharp(hiresImage)
    .resize(thumbnailWidth, thumbnailHeight)
    .webp()
    .toBuffer()
    .then((data) => {
      fs.writeFile(outputImage, data, (err) => {
        if (err) throw err;
      });
    })
    .catch((err) => console.log(err));
};

// generate thumbnail for each file in themes folder
async function generateThumbnails() {
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      return console.log("Unable to scan directory: " + err);
    }
    files.forEach((file) => {
      if (path.extname(file) === ".png") {
        generateThumbnail(file);
      }
    });
  });
}

generateThumbnails();
