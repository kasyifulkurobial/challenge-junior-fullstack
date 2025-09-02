import sqlite3 from "sqlite3"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const dbPath = join(__dirname, "..", "data", "rumah_makan.db")

class Database {
       constructor() {
              this.db = null
       }

       connect() {
              return new Promise((resolve, reject) => {
                     this.db = new sqlite3.Database(dbPath, (err) => {
                            if (err) {
                                   console.error("❌ Error connecting to database:", err.message)
                                   reject(err)
                            } else {
                                   console.log("📦 Connected to SQLite database")
                                   resolve(this.db)
                            }
                     })
              })
       }

       async initialize() {
              if (!this.db) {
                     await this.connect()
              }

              return new Promise((resolve, reject) => {
                     this.db.run(
                            `
        CREATE TABLE IF NOT EXISTS reservations (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          guests INTEGER NOT NULL,
          date TEXT NOT NULL,
          time TEXT NOT NULL,
          status TEXT DEFAULT 'pending',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `,
                            (err) => {
                                   if (err) {
                                          console.error("❌ Error creating reservations table:", err.message)
                                          reject(err)
                                   } else {
                                          console.log("✅ Reservations table ready")
                                          resolve()
                                   }
                            },
                     )
              })
       }

       getConnection() {
              return this.db
       }

       close() {
              if (this.db) {
                     this.db.close((err) => {
                            if (err) {
                                   console.error("Error closing database:", err.message)
                            } else {
                                   console.log("📦 Database connection closed")
                            }
                     })
              }
       }
}

const database = new Database()

export const connectDatabase = async () => {
       try {
              await database.initialize()
       } catch (error) {
              console.error("Failed to initialize database:", error)
              process.exit(1)
       }
}

export const getDatabase = () => database.getConnection()

// Graceful shutdown
process.on("SIGINT", () => {
       database.close()
       process.exit(0)
})

process.on("SIGTERM", () => {
       database.close()
       process.exit(0)
})
