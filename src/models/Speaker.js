export type SpeakerData = {
  id: number,
  name: ?string,
};
export default class Speaker {
  id: number;
  name: ?string;

  constructor(data: SpeakerData) {
    this.id = data.id;
    this.name = data.name;
  }
}
