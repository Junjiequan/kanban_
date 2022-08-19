export const hasDuplicates = (index: number, array: any) => {
  const arr = array.map((i: any) => i.name);
  const unique = new Set(arr);
  const uniqueArr = Array.from(unique);
  if (unique.size < arr.length) {
    if (uniqueArr[index] && uniqueArr[index] == arr[index]) {
      return true;
    }
    return false;
  }
  return true;
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
