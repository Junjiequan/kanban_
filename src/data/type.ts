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
  ViewTask?: boolean | Record<string, never>;
  AddNewTask?: boolean | Record<string, never>;
  AddBoard?: boolean | Record<string, never>;
  EdlitTask?: boolean | Record<string, never>;
  EditBoard?: boolean | Record<string, never>;
  DeleteBoard?: boolean;
  DeleteTask?: boolean;
}

export interface DataState {
  data: LocalData | Record<string, never>;
}

export interface LocalData {
  name: string;
  columns?: {
    name: string;
    tasks: {
      title: string;
      description: string;
      status: string;
      subtasks?: {
        title: string;
        isCompleted: boolean;
      }[];
    }[];
  }[];
}
