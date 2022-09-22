class OutOfBoundsException extends Error {
  constructor(message?: string) {
    super(message || 'Unable to move robot, position out of bounds');
  }
}

export default OutOfBoundsException;
