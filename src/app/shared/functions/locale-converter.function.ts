import { LanguageType } from '@enums';

export const getLocaleValue = (locale: LanguageType): string => {
  switch (locale) {
    case LanguageType.EN:
      return 'English';
    case LanguageType.NL:
      return 'Dutch';
    default:
      return locale;
  }
};
