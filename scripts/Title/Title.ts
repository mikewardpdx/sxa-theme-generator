export class Title {
  private api: any = {};
  private foo = <Element>document.getElementById('testButton');

  constructor() {
    this.api.init = this.init;
  }

  get mount() {
    return this.api;
  }

  init = () => {
    this.foo.addEventListener('click', this.makeNoise);
  }

  makeNoise(): void {
    alert('BOOM!!')
  }
}
