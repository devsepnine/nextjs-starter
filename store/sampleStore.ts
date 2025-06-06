import { create } from 'zustand';

interface SampleStore {
  number: number;
}

const useSampleStore = create<SampleStore>(() => ({
  number: 0,
  number2: '0',
}));

const increase = () => {
  useSampleStore.setState((state) => ({ number: state.number + 1 }));
};

const decrease = () => {
  useSampleStore.setState((state) => ({ number: state.number - 1 }));
};

export { useSampleStore, increase, decrease };
