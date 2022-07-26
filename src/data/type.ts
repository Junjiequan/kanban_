export interface ITab {
  key?: number;
  tab?: string;
  addNew?: boolean;
}
export interface IThemeChange {
  themeChange: () => void;
}

export interface IModal {
  ViewTask?: boolean;
  AddNewTask?: boolean;
  AddBoard?: boolean;
  EdlitTask?: boolean;
  EditBoard?: boolean;
  DeleteBoard?: boolean;
  DeleteTask?: boolean;
}
