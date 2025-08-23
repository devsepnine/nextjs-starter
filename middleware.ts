import { NextRequest, NextResponse } from 'next/server';
import { FALLBACK_LANG, LANGUAGE_COOKIE, SUPPORTED_LNGS, setLanguageCookie } from '@/lib/i18n';

export function middleware(request: NextRequest) {
  // 이미 언어 쿠키가 설정되어 있는지 확인
  const existingLocale = request.cookies.get(LANGUAGE_COOKIE)?.value;

  // 쿠키가 있고 지원하는 언어면 그대로 진행
  if (existingLocale && SUPPORTED_LNGS.includes(existingLocale)) {
    return NextResponse.next();
  }

  // Accept-Language 헤더에서 브라우저 언어 감지
  const acceptLanguage = request.headers.get('accept-language');
  let detectedLanguage = FALLBACK_LANG;

  if (acceptLanguage) {
    detectedLanguage = setLanguageCookie(acceptLanguage);
  }

  // 응답 생성 및 쿠키 설정
  const response = NextResponse.next();

  if (detectedLanguage && SUPPORTED_LNGS.includes(detectedLanguage)) {
    response.cookies.set(LANGUAGE_COOKIE, detectedLanguage, {
      maxAge: 60 * 60 * 24 * 365, // 1년
      path: '/',
      httpOnly: false, // 클라이언트에서도 접근 가능
      secure: process.env.NODE_ENV === 'production', // 프로덕션에서는 HTTPS만
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  // 정적 파일과 API 경로는 제외
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets|manifest|sw.js|workbox).*)'],
};
