import { Coordinates, Table, TableConfig } from '../types';

class TableSurface implements Table {
  constructor(private readonly config: TableConfig) {}

  public isOutOfBounds = (currentPosition: Coordinates): boolean => {
    const { x, y } = currentPosition;

    const { width, height } = this.config;

    return x > width || y > height;
  };
}

export default TableSurface;
