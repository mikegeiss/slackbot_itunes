export class Eintrag {
  projektName: string;
  buildConfigurationId: string;

  static parse(input: string): Eintrag {
    let split: string[] = input.split(" ");
    return {projektName: split[0], buildConfigurationId: split[1]};
  }
}