
import React, { createContext, useContext, useState } from 'react';
import { Language, LocalizedText } from '../types/index';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  resolveText: (text: LocalizedText) => string;
  formatDate: (dateStr: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => key,
  resolveText: (text) => typeof text === 'string' ? text : text['en'] || '',
  formatDate: (d) => d
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => translations[language][key] || key;

  const resolveText = (text: LocalizedText): string => {
      if (typeof text === 'string') return text;
      return text[language] || text['en'] || '';
  };

  const formatDate = (dateStr: string) => {
      try {
          const date = new Date(dateStr);
          return new Intl.DateTimeFormat(language, { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
      } catch (e) {
          return dateStr;
      }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, resolveText, formatDate }}>
      {children}
    </LanguageContext.Provider>
  );
};
