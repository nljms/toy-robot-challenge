class InvalidDirectoryException extends Error {
  constructor(message?: string) {
    super(message || 'Invalid input!');
  }
}

export default InvalidDirectoryException;
