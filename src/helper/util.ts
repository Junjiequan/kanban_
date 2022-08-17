export const hasDuplicates = (array: any) => {
  const arr = array.map((i: any) => i.name);
  return new Set(arr).size !== arr.length;
};

export const reorderInSameColumn = (sourceCol: any, startIndex: number, endIndex: number) => {
  const newTasks = Array.from(sourceCol.tasks);

  const [removed] = newTasks.splice(startIndex, 1);

  newTasks.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    tasks: newTasks,
  };

  return newColumn;
};

export const reorderInDiffColumn = (
  sourceCol: any,
  destinationCol: any,
  sourceIndex: number,
  destinationIndex: number
) => {
  const startTasks = Array.from(sourceCol.tasks);
  const [removed] = startTasks.splice(sourceIndex, 1);
  const newStartCol = { ...sourceCol, tasks: startTasks };

  const endTasks = Array.from(destinationCol.tasks);
  endTasks.splice(destinationIndex, 0, removed);
  const newEndCol = { ...destinationCol, tasks: endTasks };

  return { newStartCol, newEndCol };
};
