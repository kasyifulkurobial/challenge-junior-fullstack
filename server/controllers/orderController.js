import { getDatabase } from "../database.js"

export const createOrder = async (req, res, next) => {
  const db = getDatabase()

  try {
    const { customerName, customerPhone, orderType, deliveryAddress, items, totalPrice } = req.body

    console.log('[ORDER] Received order data:', req.body)

    // Insert new order
    const result = await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO orders (customer_name, customer_phone, order_type, delivery_address, items, total_price, status) 
         VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
        [customerName, customerPhone, orderType, deliveryAddress || null, JSON.stringify(items), totalPrice],
        function (err) {
          if (err) {
            console.error('[ORDER] Database error:', err)
            reject(err)
          } else {
            console.log('[ORDER] Order created with ID:', this.lastID)
            resolve({ id: this.lastID })
          }
        },
      )
    })

    res.status(201).json({
      success: true,
      message: "Pesanan berhasil dikirim! Kami akan menghubungi Anda untuk konfirmasi.",
      data: {
        id: result.id,
        customerName,
        customerPhone,
        orderType,
        deliveryAddress,
        items,
        totalPrice,
        status: "pending",
      },
    })
  } catch (error) {
    console.error('[ORDER] Error creating order:', error)
    next(error)
  } finally {
    db.close((err) => {
      if (err) console.error("Error closing database:", err.message)
    })
  }
}

export const getAllOrders = async (req, res, next) => {
  const db = getDatabase()

  try {
    const orders = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM orders ORDER BY created_at DESC", (err, rows) => {
        if (err) reject(err)
        else {
          // Parse items JSON for each order
          const ordersWithParsedItems = rows.map(order => ({
            ...order,
            items: JSON.parse(order.items)
          }))
          resolve(ordersWithParsedItems)
        }
      })
    })

    res.json({
      success: true,
      data: orders,
    })
  } catch (error) {
    next(error)
  } finally {
    db.close((err) => {
      if (err) console.error("Error closing database:", err.message)
    })
  }
}

export const updateOrderStatus = async (req, res, next) => {
  const db = getDatabase()

  try {
    const { id } = req.params
    const { status } = req.body

    console.log(`[ORDER] Updating order ${id} to status: ${status}`)

    const validStatuses = ["pending", "confirmed", "preparing", "ready", "delivered", "cancelled", "completed"]
    if (!validStatuses.includes(status)) {
      console.log(`[ORDER] Invalid status provided: ${status}`)
      return res.status(400).json({
        success: false,
        message: "Status tidak valid",
      })
    }

    // Check if order exists
    const existingOrder = await new Promise((resolve, reject) => {
      db.get("SELECT * FROM orders WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.log(`[ORDER] Error checking order: ${err.message}`)
          reject(err)
        } else {
          console.log(`[ORDER] Found order:`, row)
          resolve(row)
        }
      })
    })

    if (!existingOrder) {
      console.log(`[ORDER] Order ${id} not found`)
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan",
      })
    }

    const result = await new Promise((resolve, reject) => {
      db.run(
        `UPDATE orders 
         SET status = ?, updated_at = CURRENT_TIMESTAMP 
         WHERE id = ?`,
        [status, id],
        function (err) {
          if (err) {
            console.log(`[ORDER] Error updating order: ${err.message}`)
            reject(err)
          } else {
            console.log(`[ORDER] Update result - changes: ${this.changes}`)
            resolve({ changes: this.changes })
          }
        },
      )
    })

    // Validasi apakah update berhasil
    if (result.changes === 0) {
      console.log(`[ORDER] No rows were updated for order ${id}`)
      return res.status(404).json({
        success: false,
        message: "Pesanan tidak ditemukan atau tidak ada perubahan",
      })
    }

    res.json({
      success: true,
      message: "Status pesanan berhasil diupdate",
      data: {
        id,
        status,
        rowsAffected: result.changes 
      },
    })
  } catch (error) {
    console.log(`[ORDER] Error in updateOrderStatus:`, error)
    next(error)
  } finally {
    db.close((err) => {
      if (err) console.error("Error closing database:", err.message)
    })
  }
}