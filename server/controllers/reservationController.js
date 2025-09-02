import { getDatabase } from "../config/database.js"

export const createReservation = async (req, res, next) => {
       try {
              const { name, phone, guests, date, time } = req.body
              const db = getDatabase()

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
       }
}

export const getReservations = async (req, res, next) => {
       try {
              const db = getDatabase()

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
       }
}
