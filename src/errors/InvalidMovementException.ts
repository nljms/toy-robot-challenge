class InvalidMovementException extends Error {
  constructor(message?: string) {
    super(message || 'Invalid movement!');
  }
}

export default InvalidMovementException;
