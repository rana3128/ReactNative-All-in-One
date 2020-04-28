import * as config from "../config.json";
import * as FileSystem from "expo-file-system";
const databasePath = FileSystem.documentDirectory + config.DBpath;
const appDataServer = config.appDataServer + config.DBpath;
const dbfolder = FileSystem.documentDirectory + config.DBfolder;
const imgFolder = FileSystem.documentDirectory + config.imagesPath;

const getImage = (imgName) =>{
    return new Promise((resolve, reject) => {
        const path = FileSystem.documentDirectory + config.imagesPath + '/' + imgName;
        FileSystem.readAsStringAsync(path)
        .then(res => {
            return resolve(res);
        }).catch(err => console.log(err));
    })
}

module.exports = {
    getImage
}