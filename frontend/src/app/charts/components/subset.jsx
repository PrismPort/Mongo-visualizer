const Subset = {
  typeIncludes(subset_, type_) {
    return (subset_.type instanceof Array
      && subset_.type.includes(type_));
  },
  typeIs(subset_, type_) {
    return subset_.type === type_;
  },
  getValues(subset_) {
    return subset_.types[0].values;
  },
  getName(subset_) {
    return subset_.name;
  },
  getFields(subset_) {
    return subset_.types[0].fields;
  },
}
export { Subset };
