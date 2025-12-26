import IAction from '@common/interfaces/IAction';

export class GetProperty implements IAction {
  constructor(private config: Record<string, string>) {}

  do = (propertyName: string) => {
    let value = this.config ? this.config[propertyName] : undefined;
    if (value === undefined) value = process.env[propertyName];
    return value;
  };
}
