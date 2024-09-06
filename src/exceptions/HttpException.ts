class HttpException extends Error {
  statusCode: number;
  errorCode?: any;
  
  constructor(error: { errorCode?: any; statusCode: number; message?: string }) {
    super(error.message);
    this.statusCode = error.statusCode;
    this.errorCode = error.errorCode;
  }
}

export default HttpException;