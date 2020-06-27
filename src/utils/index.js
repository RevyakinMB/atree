const dfs = (
  verticesWithChildren,
  recordsMap,
  reorderedRecords,
  root,
) => {
  const sortedTreeRecords = [];
  const vertices = [{
    id: root.id,
    depth: 0,
  }];
  while (vertices.length) {
    const vertex = vertices.shift();
    const record = recordsMap[vertex.id];
    sortedTreeRecords.push({
      ...record,
      depth: vertex.depth,
    });

    const children = verticesWithChildren[vertex.id];
    if (children) {
      vertices.unshift(...children.map((v) => ({
        id: v,
        depth: vertex.depth + 1,
      })));
    }
  }
  return reorderedRecords.concat(sortedTreeRecords);
};

const reoderIntoTree = (source, parentProperty = 'parent') => {
  const verticesWithChildren = source.reduce((vertices, record) => {
    const parent = record[parentProperty];
    if (!parent) {
      return vertices;
    }
    const parentVertex = vertices[parent] || [];
    return {
      ...vertices,
      [parent]: parentVertex.concat(record.id),
    };
  }, {});

  const recordsMap = source.reduce((records, record) => ({
    ...records,
    [record.id]: record,
  }), {});

  const rootRecords = source.filter((record) => !record[parentProperty]);

  return rootRecords.reduce(dfs.bind(
    undefined,
    verticesWithChildren,
    recordsMap,
  ), []);
};

export default reoderIntoTree;
