import { create } from 'zustand';

interface SampleStore {
  number: number;
  number2: string;
  increase: () => void;
  decrease: () => void;
  setNumber2: (value: string) => void;
}

const useSampleStore = create<SampleStore>((set) => ({
  number: 0,
  number2: '0',
  increase: () => {
    set((state) => ({
      number: state.number + 1,
    }));
  },
  decrease: () => {
    set((state) => ({ number: state.number - 1 }));
  },
  setNumber2: (value: string) => set({ number2: value }),
}));

export default useSampleStore;
