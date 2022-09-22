import { Robot, User } from '../types';
import ToyRobot from './robot';

class Player implements User {
  public id: number = 0;
  public robot: Robot;

  constructor(private readonly robotInstance: ToyRobot) {
    this.robot = this.robotInstance;
  }
}

export default Player;
