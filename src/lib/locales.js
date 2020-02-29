export default function locales(lang) {
  if (Object.keys(languages).includes(lang)) {
    return languages[lang];
  }

  return languages.enUS;
};

const languages = {
  ptBR: {
    REQUIRED: 'Por favor, preencha o campo.',
    TOOSHORT: 'Tamanho é menor que %d.'
  },
  enUS: {
    REQUIRED: 'Please fill out this field.',
    TOOSHORT: 'Length is more less than %d.'
  }
};
