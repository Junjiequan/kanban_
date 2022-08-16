export const reorderColumnList = (sourceCol: any, startIndex: number, endIndex: number) => {
  const newTasks = Array.from(sourceCol.tasks);

  const [removed] = newTasks.splice(startIndex, 1);

  newTasks.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    tasks: newTasks,
  };

  return newColumn;
};
