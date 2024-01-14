class DocumentChart {
  constructor(subset) {
    this.subset = subset;
  }
  getComponent() {
    const components = [];
    this.subset?.types[0].fields?.forEach((document, index) => {
      const chart = SELECTOR.getChartFor(document);
      // chart.setComponentKey(`chart-${index}`)
      const Component = chart.getComponent();
      components.push(Component);
    });
    return (
      <>
        <div className='aspect-[3/4] rounded-lg border-2 border-black p-12'>
          <h1>{this.subset.name}</h1>
          {components}
        </div>
      </>
    )
  }
}

function documentChallenge(subset) {
  if (subset.type instanceof Array
    && subset.type.includes('Document')) {
    return true;
  } else if (subset.type === 'Document') {
    return true;
  } else {
    return false;
  }
}

export { documentChallenge, DocumentChart };
