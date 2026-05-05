import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  bn: () => import("./dictionaries/bn.json").then((m) => m.default),
};

export const getDictionary = async (locale) => {
  // Use the requested locale, or fall back to 'en' if it doesn't exist
  const loader = dictionaries[locale] ?? dictionaries.en;

  return loader();
};
