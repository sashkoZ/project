import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (var enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }
    return keys;
  }
}

export enum JobTypeEnum {
  FullTime = 0,
  PartTime = 1,
  Temporary = 2,
  Contract = 3,
  Internship = 4
}
