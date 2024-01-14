class Subset {
  constuctor(obj) {
    if (!obj) {
      throw new TypeError(`Cannot make subset out of ${obj}.`)
    }
    this.obj = obj;
  }
  typeIncludes(type_) {
    return (this.obj.type instanceof Array
      && this.obj.type.includes(type_));
  }
  typeIs(type_) {
    return this.obj.type === type_;
  }
  get values() {
    return this.obj.types[0].values;
  }
  getName() {
    return this.obj?.name || 'no name';
  }
  getFields() {
    return this.obj.types[0].fields;
  }
}

export { Subset };
