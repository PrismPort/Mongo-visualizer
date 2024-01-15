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
  getArraySubsets(subset_) {
    let ret = [];
    const lengths = subset_.types[0].lengths;
    const values = subset_.types[0].types[0].values;
    // TODO: refactor this. It turns this:
    // values: [1, 2, 3, 4, 5, 6, 7], lengths: [2, 2, 3]
    // into this:
    // ret = [[1, 2], [3, 4], [5, 6, 7]]

    // Maybe this should return a list of subsets. That way, we can reuse the SELECTOR to select each element of the Array.
    let i = 0;
    let j = 0;
    while (i < values.length && i < 1000) {
      let k = i;
      let arr = [];
      while (k < lengths[j] + i && k < 1000) {
        arr.push(values[k])
        k++;
      }
      ret.push(arr)
      i = k;
      j++;
    }

    return ret;
  },
  getName(subset_) {
    return subset_.name;
  },
  getFields(subset_) {
    return subset_.types[0].fields;
  },
  toString(subset_) {
    return JSON.stringify(subset_, null, 4);
  }
}
export { Subset };
