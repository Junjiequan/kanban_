export interface ITab {
  key?: number;
  tab?: string;
  addNew?: boolean;
  defaultTab?: boolean;
}

// interface ModalDetail {}

export interface IModal {
  ViewTask?: boolean | Record<string, never>;
  AddNewTask?: boolean | Record<string, never>;
  AddBoard?: boolean | Record<string, never>;
  EdlitTask?: boolean | Record<string, never>;
  EditBoard?: boolean | Record<string, never>;
  DeleteBoard?: boolean;
  DeleteTask?: boolean;
}

/**
 * @desc Column data below
 */

export interface ISubTask {
  title?: string;
  isCompleted?: boolean;
}

export interface ITask {
  title?: string;
  description?: string;
  status?: string;
  subtasks?: ISubTask[];
}

export interface IColumn {
  name?: string;
  tasks?: ITask[];
}

export interface IBoard {
  name?: string;
  columns?: IColumn[];
}
