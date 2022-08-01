export interface ITab {
  key?: number;
  tab?: string;
  addNew?: boolean;
  defaultTab?: boolean;
}

// interface ModalDetail {
//   nothing: '';
// }

export type modalTypes =
  | 'ViewTask'
  | 'AddBoard'
  | 'AddNewTask'
  | 'EditTask'
  | 'EditBoard'
  | 'DeleteBoard'
  | 'DeleteTask'
  | '';

export interface IModal {
  ModalType: modalTypes;
  ModalDetail?: Record<string, never> | any;
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
