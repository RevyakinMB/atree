const { dfs, treeSort } = require('@/utils');

describe('project utils', () => {
  describe('dfs', () => {
    it('should traverse the tree depth-first', () => {
      const treeDescription = {
        1: [3, 4, 5],
        3: [6, 7],
        7: [8],
        99: [100],
      };
      const expectedResult = [
        { depth: 0, id: 1 },
        { depth: 1, id: 3 },
        { depth: 2, id: 6 },
        { depth: 2, id: 7 },
        { depth: 3, id: 8 },
        { depth: 1, id: 4 },
        { depth: 1, id: 5 },
      ];
      const sorted = dfs(1, treeDescription);
      expect(sorted).toEqual(expect.arrayContaining(expectedResult));
    });

    it('should detect cycle', () => {
      const treeDescription1 = {
        1: [3, 4, 5, 8],
        3: [6, 7],
        7: [8],
      };
      const treeDescription2 = {
        1: [1],
      };

      expect(() => {
        dfs(1, treeDescription1);
      }).toThrow();
      expect(() => {
        dfs(1, treeDescription2);
      }).toThrow();
    });
  });

  describe('treeSort', () => {
    const source = [
      { id: 1, parent: null },
      { id: 2, parent: 1 },
      { id: 3, parent: 1 },
      { id: 4, parent: 1 },
      { id: 5, parent: 4 },
      { id: 6, parent: 2 },
      { id: 100, parent: null },
      { id: 200, parent: 100 },
      { id: 201, parent: 2 },
    ];
    it('should sort provided array into flat trees array', () => {
      const result = treeSort(source);
      expect(result[0].id).toEqual(1);
      expect(result[2].id).toEqual(6);
      expect(result[3].id).toEqual(201);
      expect(result[7].id).toEqual(100);
    });

    it('should provide depth of nodes in corresponding trees', () => {
      const result = treeSort(source);
      expect(result[0]).toEqual(expect.objectContaining({
        depth: expect.any(Number),
      }));
      expect(result[3].depth).toEqual(2);
    });
  });
});
