class OutOfBoundsException extends Error {
  constructor(message?: string) {
    super(message || 'Unable to move robot');
  }
}

export default OutOfBoundsException;
