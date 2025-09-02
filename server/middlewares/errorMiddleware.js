export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

export const errorHandler = (err, req, res, next) => {
  console.error('[ERROR]', err.stack)
  
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? 'Stack hidden in production' : err.stack,
    timestamp: new Date().toISOString()
  })
}