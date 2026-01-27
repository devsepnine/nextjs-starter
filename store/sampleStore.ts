import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ───── Types ─────

type SampleState = {
  number: number;
};

type SampleActions = {
  increase: () => void;
  decrease: () => void;
};

// ───── Store ─────

const useSampleStore = create<SampleState>()(
  devtools(() => ({
    number: 0,
  }))
);

// ───── Actions (State Mutations) ─────

const sampleActions: SampleActions = {
  increase: () => useSampleStore.setState((state) => ({ number: state.number + 1 })),
  decrease: () => useSampleStore.setState((state) => ({ number: state.number - 1 })),
};

// ───── Exports ─────

export type { SampleState, SampleActions };
export { useSampleStore, sampleActions };
