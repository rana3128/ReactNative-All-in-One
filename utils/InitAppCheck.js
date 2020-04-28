import * as config from "../config.json";
import * as FileSystem from "expo-file-system";
const databasePath = FileSystem.documentDirectory + config.DBpath;
const appDataServer = config.appDataServer + "/" + config.DBpath;
const dbfolder = FileSystem.documentDirectory + config.DBfolder;
const imgFolder = FileSystem.documentDirectory + config.imagesPath;
import { getDB } from "./DBHandler";

const checkDataBase = () => {
  return new Promise((resolve, reject) => {
    FileSystem.getInfoAsync(databasePath)
      .then((res) => {
        // console.log(res);
        if (res.exists) {
          // console.log("data base is already there");
          return resolve(true);
        } else {
          FileSystem.makeDirectoryAsync(dbfolder)
            .then((res) => {
              FileSystem.downloadAsync(appDataServer, databasePath)
                .then((db) => {
                  // console.log(db);
                  getfiles();
                  return resolve(true);
                })
                .catch((err) => {
                  // console.log(err);
                  return reject(err);
                });
            })
            .catch((err) => {
              return reject(err);
            });
        }
      })
      .catch((err) => reject(err));
  });
};

const getfiles = () => {
  return new Promise((resolve, reject) => { 
    getDB().then((db) => {
      let imagesArr = [];
      for (var row of db) {
        for (var imgUrl of row.imagesName) {
          imagesArr.push(imgUrl);
        }
      }
      downloadImages(imagesArr)
        .then((res) => {
          console.log("images download");
          return resolve(true)
        })
        .catch((err) => reject(err));
    }).catch((err) => reject(err));
  });
};

const downloadDB = () => {
  return new Promise((resolve, reject) => {
    FileSystem.getInfoAsync(databasePath)
      .then((res) => {
        if (!res.exists) {
          FileSystem.getInfoAsync(dbfolder)
            .then((res) => {
              if (!res.exists) {
                FileSystem.makeDirectoryAsync(dbfolder)
                  .then((res) => {
                    FileSystem.downloadAsync(appDataServer, databasePath)
                      .then((db) => {
                        return resolve(true);
                      })
                      .catch((err) => {
                        // console.log(err);
                        return reject(err);
                      });
                  })
                  .catch((err) => {
                    return reject(err);
                  });
              } else {
                FileSystem.downloadAsync(appDataServer, databasePath)
                  .then((db) => {
                    return resolve(true);
                  })
                  .catch((err) => {
                    // console.log(err);
                    return reject(err);
                  });
              }
            })
            .catch((err) => {
              // console.log(err);
              return reject(err);
            });
        }
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

const downloadImages = (imagesArr) => {
  return new Promise((resolve, reject) => {
    FileSystem.getInfoAsync(imgFolder)
      .then(async (res) => {
        if (res.exists) {
          for (var imgName of imagesArr) {
            const imgUrl = config.appDataServer + "/appData/images/" + imgName;
            const imgLocalPath = imgFolder + "/" + imgName;
            console.log('fettching from : ',imgUrl);
            console.log('saving at : ', imgLocalPath);

            await FileSystem.downloadAsync(imgUrl, imgLocalPath)
              .then((res) => {
                console.log("file saved at : ", res);
              })
              .catch((err) => console.log(err));
          }
          return resolve(true);
        } else {
          FileSystem.makeDirectoryAsync(imgFolder).then((res) => {
            for (var imgName of imagesArr) {
              const imgUrl =
                config.appDataServer + config.imagesPath + "/" + imgName;
              const imgLocalPath = imgFolder + "/" + imgName;
              FileSystem.downloadAsync(imgUrl, imgLocalPath, {
                encoding: FileSystem.EncodingType.Base64,
              })
                .then((res) => {
                  console.log("file saved at : ", res.uri);
                })
                .catch((err) => console.log(err));
            }
            return resolve(true);
          });
        }
      })
      .catch((err) => console.log(err));
  });
};

module.exports = {
  checkDataBase,
  downloadImages,
  getfiles,
  downloadDB,
};
