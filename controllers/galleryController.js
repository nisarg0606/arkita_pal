const dropbox = require("dropbox");
const fetch = require("isomorphic-fetch");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

// Create an instance of Dropbox with the access token
const dbx = new dropbox.Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch,
});

// get the links of the images in the Dropbox folder
exports.getImages = (req, res) => {
  dbx
    .filesListFolder({ path: "" })
    .then(function (response) {
      let images = [];
      const entries = response.result.entries;
      const promises = entries.map(function (entry) {
        if (entry[".tag"] === "file" && (entry.name.endsWith('.jpg') || entry.name.endsWith('.png'))) {
          // Create a shared link with settings to view the image
          const settings = { requested_visibility: { ".tag": "public" } };
          return dbx.sharingCreateSharedLinkWithSettings({ path: entry.path_lower, settings })
            .then(function (linkResponse) {
              const imageUrl = linkResponse.result.url.replace("dl=0", "raw=1");
              images.push(imageUrl);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });

      Promise.all(promises)
        .then(function () {
          res.status(200).json(images);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
};


exports.getImagesBard = async (req, res) => {
  const images = await dbx.filesListFolder({ path: "" });
  res.json(images);
};
// router.get("/images", async (req, res) => {
//   const images = await dbx.filesListFolder({ path: "" });
//   res.json(images);
// });

// download the image from dropbox
exports.downloadImage = (req, res) => {
  dbx
    .filesDownload({ path: req.params.path })
    .then(function (response) {
      res.status(200).json(response.fileBinary);
    })
    .catch(function (error) {
      console.log(error);
    });
};

// upload the image to dropbox
exports.uploadImage = (req, res) => {
  let file = req.file;
  let filename = file.originalname;
  let filepath = path.join(__dirname, "../public/uploads/", filename);
  fs.writeFile(filepath, file.buffer, function (err) {
    if (err) {
      console.log(err);
    } else {
      fs.readFile(filepath, function (err, contents) {
        if (err) {
          console.log(err);
        } else {
          dbx
            .filesUpload({
              path: "/" + filename,
              contents: contents,
            })
            .then(function (response) {
              res.status(200).json(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    }
  });
};
