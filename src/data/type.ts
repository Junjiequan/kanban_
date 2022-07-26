export interface ITab {
  key?: number;
  tab?: string;
  addNew?: boolean;
}
export interface IThemeChange {
  themeChange: () => void;
}

// interface ModalDetail {}

export interface IModal {
  ViewTask?: boolean | any;
  AddNewTask?: boolean | any;
  AddBoard?: boolean | any;
  EdlitTask?: boolean | any;
  EditBoard?: boolean | any;
  DeleteBoard?: boolean;
  DeleteTask?: boolean;
}
