class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = "",
    data = null
  ) {
    super(message);
    this.statusCode = statusCode; // For those who prefer statusCode
    this.status = statusCode; // Convenience for quick access to status code, later need to clean and use only stausCode
    this.errors = errors;
    this.success = false;
    this.data = data; // Additional error-related data
    console.log("ApiError this", this);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Helper methods to identify specific error types
  isClientError() {
    return this.statusCode >= 400 && this.statusCode < 500;
  }

  isServerError() {
    return this.statusCode >= 500 && this.statusCode < 600;
  }

  static isNetworkError(error) {
    return error.message === "Network request failed";
  }

  // Utility to log error details for debugging
  logError() {
    if (this.isServerError() || this.isClientError()) {
      console.error(`API Error [${this.statusCode}]: ${this.message}`);
      console.error(`Details: `, this.errors);
    }
  }
}

export default ApiError;
