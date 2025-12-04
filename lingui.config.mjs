/** @type {import('@lingui/conf').LinguiConfig} */
const config = {
  // 지원하는 언어 목록 - 중국어를 간체/번체로 분리
  locales: ['en', 'ko', 'ja', 'zh-cn', 'zh-tw'],

  // 기본 언어 (fallback)
  sourceLocale: 'en',

  // 번역 파일이 저장될 위치
  catalogs: [
    {
      path: '<rootDir>/locales/{locale}/messages',
      include: ['app', 'components', 'layout', 'lib'],
      exclude: ['**/node_modules/**'],
    },
  ],

  // 번역 파일 포맷 (po 형식 사용)
  format: 'po',

  // 추출할 메시지를 찾을 디렉토리들
  rootDir: '.',

  // 컴파일된 메시지가 저장될 위치
  compileNamespace: 'cjs',

  // 플러그인 설정 (Next.js와 함께 사용)
  runtimeConfigModule: {
    i18n: ['@lingui/core', 'i18n'],
  },
};

export default config;
