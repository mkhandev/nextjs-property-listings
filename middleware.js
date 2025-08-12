// middleware.ts
import createMiddleware from "next-intl/middleware";
import { withAuth } from "next-auth/middleware";

const supportedLocales = ["en", "bn", "fr" /*...*/];

const intlMiddleware = createMiddleware({
  locales: supportedLocales,
  defaultLocale: "en",
  localeDetection: true,
});

export default withAuth(
  (req) => {
    const pathname = req.nextUrl.pathname;
    const localeSegment = pathname.split("/")[1];

    if (pathname === "/" || supportedLocales.includes(localeSegment)) {
      return intlMiddleware(req);
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        const localeSegment = pathname.split("/")[1];
        if (pathname === "/" || supportedLocales.includes(localeSegment)) {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/:locale*",
    "/properties/add",
    "/profile",
    "/properties/saved",
    "/messages",
    "/properties/:id/edit",
  ],
};
