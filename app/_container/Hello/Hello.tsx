import { msg } from '@lingui/core/macro';

import { getServerTranslations } from '@/lib/server-locale';

import { HelloClient } from './HelloClient';

export async function Hello() {
  const { t } = await getServerTranslations();
  return (
    <HelloClient
      title={t(msg`Hello Next.js`)}
      description={t(
        msg`This is a project configured for convenient and fast start of next.js projects.`
      )}
      subDescription={t(
        msg`Please let me know any improvements or feedback, and I will incorporate them.`
      )}
    />
  );
}
