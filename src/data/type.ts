export interface ITab {
  key?: number;
  tab?: string;
  addNew?: boolean;
  defaultTab?: boolean;
}

// interface ModalDetail {
//   nothing: '';
// }

export interface IModal {
  ModalType: string;
  ModalDetail?: Record<string, never> | undefined;
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
