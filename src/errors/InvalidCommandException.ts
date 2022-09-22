class InvalidCommandException extends Error {
  constructor(message?: string) {
    super(message || 'Invalid command!');
  }
}

export default InvalidCommandException;
