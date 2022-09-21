import { Position, TableConfig } from '../types';

class Table {
  constructor(private readonly config: TableConfig) {}

  public isOutOfBounds = (currentPosition: Position): boolean => {
    const { x, y } = currentPosition;

    const { width, height } = this.config;

    return x > width || y > height;
  };
}

export default Table;
