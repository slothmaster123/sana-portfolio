"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type Language = "en" | "ur";

interface LanguageContextType {
  lang: Language;
  toggle: () => void;
  t: (en: string, ur: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
  t: (en) => en,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("sana-lang") as Language;
    if (stored === "ur") setLang("ur");
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "dir",
      lang === "ur" ? "rtl" : "ltr"
    );
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("sana-lang", lang);
  }, [lang]);

  const toggle = () => setLang((prev) => (prev === "en" ? "ur" : "en"));
  const t = (en: string, ur: string) => (lang === "ur" ? ur : en);
  const isRTL = lang === "ur";

  return (
    <LanguageContext.Provider value={{ lang, toggle, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
