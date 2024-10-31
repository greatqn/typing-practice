import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomText {
  id: string;
  text: string;
  createdAt: number;
  selected: boolean;
}

interface CustomTextStore {
  texts: CustomText[];
  addText: (text: string) => void;
  removeText: (id: string) => void;
  clearAll: () => void;
  selectText: (id: string) => void;
}

export const useCustomTextStore = create<CustomTextStore>()(
  persist(
    (set) => ({
      texts: [],
      addText: (text: string) => 
        set((state) => {
          const newTexts = state.texts.map(text => ({
            ...text,
            selected: false
          }));
          return {
            texts: [
              ...newTexts,
              {
                id: Date.now().toString(),
                text,
                createdAt: Date.now(),
                selected: true
              }
            ]
          };
        }),
      removeText: (id: string) =>
        set((state) => {
          const newTexts = state.texts.filter(text => text.id !== id);
          if (state.texts.find(text => text.id === id)?.selected && newTexts.length > 0) {
            newTexts[newTexts.length - 1].selected = true;
          }
          return { texts: newTexts };
        }),
      clearAll: () => set({ texts: [] }),
      selectText: (id: string) =>
        set((state) => ({
          texts: state.texts.map((text) => ({
            ...text,
            selected: text.id === id
          }))
        }))
    }),
    {
      name: "custom-texts",
      onRehydrateStorage: () => {
        return () => {
          useCustomTextStore.setState({});
        };
      }
    }
  )
);