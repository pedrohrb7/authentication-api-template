import * as dotenv from 'dotenv';
import * as fs from 'fs';

import IAction from '@common/interfaces/IAction';

export class LoadParseDotenv implements IAction {
  do = (filePath: string) => {
    return fs.existsSync(filePath)
      ? dotenv.parse(fs.readFileSync(filePath))
      : null;
  };
}
