import { msg } from '@lingui/core/macro';

import { getServerTranslations } from '@/lib/server-locale';

import SomethingClient from './SomethingClient';

const Something = async () => {
  const { t } = await getServerTranslations();

  return (
    <SomethingClient
      sampleText={t(msg`Just Sample Design`)}
      boopText={t(msg`boop`)}
      popText={t(msg`pop`)}
    />
  );
};

export default Something;
