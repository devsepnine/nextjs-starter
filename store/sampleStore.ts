import { create } from 'zustand';

interface SampleStore {
  number: number;
  increase: () => void;
  decrease: () => void;
}

const useSampleStore = create<SampleStore>((set) => ({
  number: 0,
  increase: () => {
    set((state) => ({
      number: state.number + 1,
    }));
  },
  decrease: () => {
    set((state) => ({ number: state.number - 1 }));
  },
}));

export default useSampleStore;
