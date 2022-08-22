export interface ITab {
  key?: number;
  tab?: string;
  addNew?: boolean;
  defaultTab?: boolean;
  setToggleNav?: React.Dispatch<React.SetStateAction<boolean>>;
}

export type modalTypes =
  | 'ViewTask'
  | 'AddBoard'
  | 'AddNewTask'
  | 'AddColumn'
  | 'EditTask'
  | 'EditBoard'
  | 'DeleteBoard'
  | 'DeleteTask'
  | '';

export interface IModal {
  ModalType: modalTypes;
  ModalDetail?: Record<string, never> | any;
  Status?: string[];
  boardTab?: string;
}

/**
 * @desc Column data below
 */

export interface ISubTask {
  title: string;
  isCompleted: boolean;
}

export interface ITask {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  subtasks?: ISubTask[];
}

export interface IColumn {
  id: string;
  name?: string;
  tasks?: ITask[];
}

export interface IBoard {
  id: string;
  name?: string;
  columns?: IColumn[];
}
