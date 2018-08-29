import Expo from 'expo';

let db;

Expo.FileSystem.downloadAsync(
    Expo.Asset.fromModule(require('../assets/songs.db')).uri,
    `${Expo.FileSystem.documentDirectory}SQLite/songs.db`
).then(
    () => db = Expo.SQLite.openDatabase('songs.db')
);


export class SongDBHelper {

    static execute = (sql, args = []) => {
        return new Promise((resolve, reject) => {
            db.transaction(
                // transaction callback
                tx => {
                    tx.executeSql(sql, args, (_, result) => resolve(result), reject)
                }, 

                // when error
                (err) => console.log(err), 

                // when success
                () => {}
            )
        });
    }

    static fetchRandomSong() {
        const SQL = `
            SELECT collections.name,
                   positions.id, 
                   positions.number, 
                   positions.title, 
                   positions.text 
            FROM positions 
            JOIN collections on positions.collection_id = collections.id 
            ORDER BY RANDOM() 
            LIMIT 1;
        `
        return SongDBHelper.execute(SQL).then(result => result.rows.item(0));
    }
};
