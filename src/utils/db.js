let SQLite = require('react-native-sqlite-storage');
let db;

const iterOverRows = (rows) => {
    let result = []
    for (let i = 0; i < rows.length; i++)
        result.push(rows.item(i));
    return result;
}

export class SongDBHelper {

    static execute = (sql, args = []) => {
        return new Promise((resolve, reject) => {
            try {
                db = db || SQLite.openDatabase({ name : "songsdb", createFromLocation : '~/songsdb' });
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
            } catch (e) {
                reject(e);
            }            
        });
    }

    static fetchRandomSong() {
        const SQL = `
            SELECT c.name,
                   p.id, 
                   p.number, 
                   p.title, 
                   p.text 
            FROM positions AS p 
            JOIN collections AS c ON p.collection_id = c.id 
            ORDER BY RANDOM() 
            LIMIT 1;
        `;
        return SongDBHelper.execute(SQL).then(result => result.rows.item(0));
    }

    static fetchSongByID(id) {
        const SQL = `
            SELECT c.name,
                   p.id, 
                   p.number, 
                   p.title, 
                   p.text 
            FROM positions AS p 
            JOIN collections AS c ON p.collection_id = c.id 
            WHERE p.id = ?
            LIMIT 1;
        `;
        return SongDBHelper.execute(SQL, [id]).then(result => result.rows.item(0));
    }

    static fetchSongByNumber(collectionId, number) {
        const SQL = `
            SELECT c.name,
                   p.id, 
                   p.number, 
                   p.title, 
                   p.text 
            FROM positions AS p 
            JOIN collections AS c ON p.collection_id = c.id 
            WHERE c.id = ? AND p.number = ?
            LIMIT 1;
        `;
        return SongDBHelper.execute(SQL, [collectionId, number]).then(result => result.rows.item(0));
    }

    static fetchCollectionsList() {
        const SQL = `
            SELECT DISTINCT c.id, c.name, COUNT(p.id) AS count 
            FROM collections AS c 
            JOIN positions AS p ON p.collection_id = c.id 
            GROUP BY c.id;
        `;
        return SongDBHelper.execute(SQL).then(result => iterOverRows(result.rows));
    }

    static fetchLetters() {
        const SQL = `
            SELECT DISTINCT upper(substr(p.title, 1, 1)) AS letter 
            FROM positions AS p 
            ORDER BY letter;
        `;
        return SongDBHelper.execute(SQL).then(
            result => iterOverRows(result.rows).map(item => item.letter)
        );
    }

    static fetchSongsByLetter(letter) {
        const SQL = `
            SELECT p.id, p.title 
            FROM positions AS p 
            WHERE p.title LIKE '${letter}%' 
            ORDER BY p.title;
        `;
        return SongDBHelper.execute(SQL).then(
            result => iterOverRows(result.rows)
        )
    }

    static fetchSongsByQuery(query) {
        const SQL = `
            SELECT p.id, p.title 
            FROM positions AS p 
            WHERE p.text LIKE "%${query}%"
            ORDER BY p.title;
        `;
        return SongDBHelper.execute(SQL).then(
            result => iterOverRows(result.rows)
        )
    }
};
