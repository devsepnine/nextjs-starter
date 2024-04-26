import { RefreshProvider } from '@/layout/RefreshProvider/RefreshProvider.tsx';
import { Home } from '@/pages/home/Home.tsx';

export default async function RootPage() {
  return (
    <RefreshProvider>
      <Home />
    </RefreshProvider>
  );
}
