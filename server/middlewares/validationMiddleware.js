export const validateReservation = (req, res, next) => {
       const { name, phone, guests, date, time } = req.body
       const errors = []

       // Name validation
       if (!name || name.trim().length < 2) {
              errors.push("Nama harus diisi minimal 2 karakter")
       }

       // Phone validation
       const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
       if (!phone || !phoneRegex.test(phone.replace(/\s|-/g, ""))) {
              errors.push("Nomor telepon tidak valid")
       }

       // Guests validation
       if (!guests || guests < 1 || guests > 20) {
              errors.push("Jumlah tamu harus antara 1-20 orang")
       }

       // Date validation
       if (!date) {
              errors.push("Tanggal harus diisi")
       } else {
              const reservationDate = new Date(date)
              const today = new Date()
              today.setHours(0, 0, 0, 0)

              if (reservationDate < today) {
                     errors.push("Tidak dapat melakukan reservasi untuk tanggal yang sudah lewat")
              }

              // Check if date is not more than 30 days in advance
              const maxDate = new Date()
              maxDate.setDate(maxDate.getDate() + 30)
              if (reservationDate > maxDate) {
                     errors.push("Reservasi maksimal 30 hari ke depan")
              }
       }

       // Time validation
       const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
       if (!time || !timeRegex.test(time)) {
              errors.push("Format waktu tidak valid (HH:MM)")
       } else {
              const [hours] = time.split(":").map(Number)
              if (hours < 10 || hours > 22) {
                     errors.push("Jam operasional: 10:00 - 22:00")
              }
       }

       if (errors.length > 0) {
              return res.status(400).json({
                     success: false,
                     message: "Validasi gagal",
                     errors,
              })
       }

       next()
}
