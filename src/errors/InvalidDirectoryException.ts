class InvalidDirectoryException extends Error {
  constructor(message?: string) {
    super(message || 'Invalid directory!');
  }
}

export default InvalidDirectoryException;
