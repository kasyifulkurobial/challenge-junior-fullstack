import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const dbPath = path.join(__dirname, 'data', 'rumah_makan.db')
const backupPath = path.join(__dirname, 'data', 'rumah_makan.db.backup')

console.log('🧹 Cleaning up database...')

try {
  // Create backup if database exists
  if (fs.existsSync(dbPath)) {
    fs.copyFileSync(dbPath, backupPath)
    console.log('Database backup created at:', backupPath)
    
    // Remove the problematic database
    fs.unlinkSync(dbPath)
    console.log('Old database removed')
  }
  
  console.log('Database cleanup completed!')
  console.log('Please restart your server now')
} catch (error) {
  console.error('Error during cleanup:', error.message)
}