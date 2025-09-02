import sqlite3 from "sqlite3"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = join(__dirname, "rumah_makan.db")

export const initDatabase = () => {
       const db = new sqlite3.Database(dbPath, (err) => {
              if (err) {
                     console.error("Error opening database:", err.message)
              } else {
                     console.log("Connected to SQLite database")
              }
       })

       // Create reservations table
       db.run(
              `
    CREATE TABLE IF NOT EXISTS reservations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      guests INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `,
              (err) => {
                     if (err) {
                            console.error("Error creating reservations table:", err.message)
                     } else {
                            console.log("Reservations table ready")
                     }
              },
       )

       db.close()
}
