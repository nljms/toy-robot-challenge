class RobotMovementStore {
  constructor(private readonly moveCommand: string) {}

  public static movementLog: any[];

  public move = (command: string) => {
    RobotMovementStore.movementLog.push(command);
  };
}

export default RobotMovementStore;
