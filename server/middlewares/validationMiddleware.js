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

export const validateOrder = (req, res, next) => {
       console.log('[VALIDATION] Received order data for validation:', req.body)
       
       const { customerName, customerPhone, orderType, items, totalPrice } = req.body
       const errors = []

       // Customer name validation
       if (!customerName || customerName.trim().length < 2) {
              errors.push("Nama pemesan harus diisi minimal 2 karakter")
       }

       // Phone validation
       const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/
       if (!customerPhone || !phoneRegex.test(customerPhone.replace(/\s|-/g, ""))) {
              errors.push("Nomor telepon tidak valid")
       }

       // Order type validation
       const validOrderTypes = ["dine-in", "takeaway", "delivery"]
       if (!orderType || !validOrderTypes.includes(orderType)) {
              errors.push("Jenis pesanan tidak valid")
       }

       // Delivery address validation for delivery orders
       if (orderType === "delivery" && (!req.body.deliveryAddress || req.body.deliveryAddress.trim().length < 10)) {
              errors.push("Alamat pengantaran harus diisi minimal 10 karakter untuk pesanan antar")
       }

       // Items validation
       if (!items || !Array.isArray(items) || items.length === 0) {
              errors.push("Pesanan harus berisi minimal 1 item")
       } else {
              items.forEach((item, index) => {
                     if (!item.id || !item.name || !item.price || !item.quantity) {
                            errors.push(`Item ke-${index + 1} tidak lengkap`)
                     }
                     if (item.quantity < 1 || item.quantity > 50) {
                            errors.push(`Jumlah item ${item.name} harus antara 1-50`)
                     }
                     if (item.price < 1000 || item.price > 1000000) {
                            errors.push(`Harga item ${item.name} tidak valid`)
                     }
              })
       }

       // Total price validation
       if (!totalPrice || totalPrice < 1000) {
              errors.push("Total harga minimal Rp 1.000")
       }

       // Validate calculated total matches sent total
       if (items && Array.isArray(items)) {
              const calculatedTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
              console.log('[VALIDATION] Calculated total:', calculatedTotal, 'Sent total:', totalPrice)
              
              if (Math.abs(calculatedTotal - totalPrice) > 100) {
                     // Allow small rounding differences
                     errors.push("Total harga tidak sesuai dengan perhitungan")
              }
       }

       if (errors.length > 0) {
              console.log('[VALIDATION] Validation errors:', errors)
              return res.status(400).json({
                     success: false,
                     message: "Validasi pesanan gagal",
                     errors,
              })
       }

       console.log('[VALIDATION] Order validation passed')
       next()
}