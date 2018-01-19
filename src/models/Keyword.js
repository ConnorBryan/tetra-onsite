export type KeywordData = {
  uuid: string,
  name: string,
  extractor: string,
};
export default class Keyword {
  uuid: string;
  name: string;
  extractor: string;

  constructor({ uuid, name, extractor }: KeywordData) {
    this.uuid = uuid;
    this.name = name;
    this.extractor = extractor;
  }
}
