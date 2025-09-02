import { getDatabase } from "../database.js"

export const createReservation = async (req, res, next) => {
  const db = getDatabase()
  
  try {
    const { name, phone, guests, date, time } = req.body

    // Check for existing reservation at the same date and time
    const existingReservation = await new Promise((resolve, reject) => {
      db.get(
        "SELECT * FROM reservations WHERE date = ? AND time = ? AND status != 'cancelled'",
        [date, time],
        (err, row) => {
          if (err) reject(err)
          else resolve(row)
        },
      )
    })

    if (existingReservation) {
      return res.status(409).json({
        success: false,
        message: "Waktu tersebut sudah dipesan, silakan pilih waktu lain",
      })
    }

    // Insert new reservation
    const result = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO reservations (name, phone, guests, date, time, status) 
         VALUES (?, ?, ?, ?, ?, 'pending')`,
        [name, phone, guests, date, time],
        function (err) {
          if (err) reject(err)
          else resolve({ id: this.lastID })
        },
      )
    })
    
    res.status(201).json({
      success: true,
      message: "Reservasi berhasil dibuat! Kami akan menghubungi Anda untuk konfirmasi.",
      data: {
        id: result.id,
        name,
        phone,
        guests,
        date,
        time,
        status: "pending",
      },
    })
  } catch (error) {
    next(error)
  } finally {
    db.close((err) => {
      if (err) console.error("Error closing database:", err.message)
    })
  }
}

export const getAllReservations = async (req, res, next) => {
  const db = getDatabase()
  
  try {
    const reservations = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM reservations ORDER BY created_at DESC", (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })

    res.json({
      success: true,
      data: reservations,
    })
  } catch (error) {
    next(error)
  } finally {
    db.close((err) => {
      if (err) console.error("Error closing database:", err.message)
    })
  }
}

export const updateReservationStatus = async (req, res, next) => {
  const db = getDatabase()
  
  try {
    const { id } = req.params
    const { status } = req.body

    console.log(`[v0] Updating reservation ${id} to status: ${status}`)

    const validStatuses = ["pending", "confirmed", "cancelled", "completed"]
    if (!validStatuses.includes(status)) {
      console.log(`[v0] Invalid status provided: ${status}`)
      return res.status(400).json({
        success: false,
        message: "Status tidak valid",
      })
    }

    // Check if reservation exists
    const existingReservation = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM reservations WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.log(`[v0] Error checking reservation: ${err.message}`)
          reject(err)
        } else {
          console.log(`[v0] Found reservation:`, row)
          resolve(row)
        }
      })
    })

    if (!existingReservation) {
      console.log(`[v0] Reservation ${id} not found`)
      return res.status(404).json({
        success: false,
        message: "Reservasi tidak ditemukan",
      })
    }

    // Update reservation status with current timestamp
    const result = await new Promise((resolve, reject) => {
      db.run(
        `UPDATE reservations 
         SET status = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [status, id],
        function (err) {
          if (err) {
            console.log(`[v0] Error updating reservation: ${err.message}`)
            reject(err)
          } else {
            console.log(`[v0] Update result - changes: ${this.changes}`)
            resolve({ changes: this.changes })
          }
        },
      )
    })

    res.json({
      success: true,
      message: "Status reservasi berhasil diupdate",
      data: { id, status },
    })
  } catch (error) {
    console.log(`[v0] Error in updateReservationStatus:`, error)
    next(error)
  } finally {
    db.close((err) => {
      if (err) console.error("Error closing database:", err.message)
    })
  }
}

// Keep backward compatibility
export const getReservations = getAllReservations