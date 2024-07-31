import Database from 'better-sqlite3';

const database = new Database('royal_rumbler.db');
database.pragma('journal_mode = WAL');

export default database;