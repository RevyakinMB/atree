export const dfs = (
  root,
  vertexChildren,
) => {
  if (root === undefined || !vertexChildren) {
    throw new Error('Invalid arguments.');
  }

  const result = [];
  const visited = {};
  const vertices = [{
    id: root,
    depth: 0,
  }];

  while (vertices.length) {
    const vertex = vertices.shift();
    if (visited[vertex.id]) {
      throw new Error('Cycle detected.');
    }
    visited[vertex.id] = true;
    result.push({
      id: vertex.id,
      depth: vertex.depth,
    });

    const children = vertexChildren[vertex.id];
    if (children) {
      vertices.unshift(...children.map((id) => ({
        id,
        depth: vertex.depth + 1,
      })));
    }
  }
  return result;
};

export const getVertexChildren = (records) => records.reduce((vertices, record) => {
  const parent = record.parent || record.localParent;
  if (!parent) {
    return vertices;
  }
  const parentVertex = vertices[parent] || [];
  return {
    ...vertices,
    [parent]: parentVertex.concat(record.id || record.localId),
  };
}, {});

export const treeSort = (source) => {
  if (!Array.isArray(source)) {
    throw new Error('No records provided.');
  }
  if (!source.length) {
    return [];
  }

  const vertexChildren = getVertexChildren(source);

  const recordsMap = source.reduce((records, record) => ({
    ...records,
    [record.id || record.localId]: record,
  }), {});

  const rootRecords = source.filter(
    (record) => !record.parent && !record.localParent,
  );

  return rootRecords.reduce((result, root) => result.concat(
    dfs(root.id || root.localId, vertexChildren),
  ), []).map((node) => ({
    ...recordsMap[node.id || node.localId],
    depth: node.depth,
  }));
};
