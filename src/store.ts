import { create } from "zustand";

export type State = {
  paths: Set<string>;
  currentPath: string | null;
  contents: string;

  updatePath: (path: string | null) => void;
  updateContents: (contents: string) => void;
  addPath: (path: string) => void;
};

export const useStateStore = create<State>((set) => ({
  paths: new Set<string>(),
  currentPath: null,
  contents: "",

  updatePath: (path: string | null) => set(() => ({ currentPath: path })),
  updateContents: (contents: string) => set(() => ({ contents: contents })),
  addPath: (path: string) =>
    set((state) => {
      const newPaths = new Set(state.paths);
      newPaths.add(path);
      return { paths: newPaths };
    }),
}));
