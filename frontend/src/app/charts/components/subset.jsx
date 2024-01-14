class Subset {
  constuctor(subset) {
    this.subset = subset;
  }

}

function subsetValues(subset) {
  return subset.types[0].values;
}

function subsetName(subset) {
  return subset.name;
}
function subsetFields(subset) {
  return subset.types[0].fields;
}
function subsetName(subset) {
  return subset.name;
}

function subsetIsArray(subset) {
  return subset.type instanceof Array;
}
function subsetArrayIncludesType(subset, type_) {
  return subset.type.includes(type_);
}

function subsetIsType(subset, type_) {
  return subset.type === type_;
}