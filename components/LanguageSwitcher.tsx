"use client";

import { usePathname, useRouter } from "next/navigation";

const supportedLocales = [
  { code: "en", label: "English" },
  { code: "bn", label: "বাংলা" },
  // add more languages here...
];

export default function LanguageSwitcher() {
  const pathname = usePathname(); // current path, e.g. /en/profile or /bn/messages
  const router = useRouter();

  // Extract current locale from the pathname
  const pathSegments = pathname.split("/");
  const currentLocale = supportedLocales.some((l) => l.code === pathSegments[1])
    ? pathSegments[1]
    : "en"; // default locale fallback

  // Replace the locale segment in the pathname with the new locale
  function switchLanguage(newLocale: string) {
    pathSegments[1] = newLocale;
    const newPath = pathSegments.join("/") || "/";
    router.push(newPath);
  }

  return (
    <select
      value={currentLocale}
      onChange={(e) => switchLanguage(e.target.value)}
      aria-label="Select Language"
      style={{ padding: "0.25rem 0.5rem", fontSize: "1rem" }}
    >
      {supportedLocales.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
}
