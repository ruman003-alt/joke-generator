const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  // Axios/Network errors
  if (err.code === 'ECONNABORTED') {
    return res.status(504).json({
      success: false,
      error: 'Request timeout - API is not responding'
    });
  }

  if (err.code === 'ENOTFOUND' || err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      success: false,
      error: 'Service unavailable - Cannot reach API'
    });
  }

  // Default error response
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
