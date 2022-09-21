import fs from 'fs';

class ReadFileCommand {
  private parseFile = (data: string) => {
    console.log(data);
    return data;
  };

  public execute = async (directory: string) => {
    const file = await fs.readFileSync(directory);

    return this.parseFile(Buffer.from(file).toString('utf-8'));
  };
}

export default ReadFileCommand;
