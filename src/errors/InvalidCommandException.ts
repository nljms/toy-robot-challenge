class InvalidCommandException extends Error {
  constructor(message?: string) {
    super(message || 'Invalid input!');
  }
}

export default InvalidCommandException;
