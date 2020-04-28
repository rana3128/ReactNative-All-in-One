import * as config from "../config.json";
import * as FileSystem from "expo-file-system";
const databasePath = FileSystem.documentDirectory + config.DBpath;
const appDataServer = config.appDataServer + config.DBpath;
const dbfolder = FileSystem.documentDirectory + config.DBfolder;

const getDB = () =>{
    return new Promise((resolve, reject) => {
        FileSystem.readAsStringAsync(databasePath)
        .then(res => {
            const db = JSON.parse(res);
            return resolve(db.dataBase);
        }).catch(err => console.log(err));
    })
}

module.exports = {
    getDB
}