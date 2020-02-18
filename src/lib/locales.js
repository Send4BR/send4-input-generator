export default function locales(lang) {
  if (Object.keys(languages).includes(lang)) {
    return languages[lang];
  }

  return languages.enUS;
};

const languages = {
  ptBR: {
    REQUIRED: 'Obrigatório',
    MINLENGTH: 'Tamanho é menor que %d'
  },
  enUS: {
    REQUIRED: 'Required',
    MINLENGTH: 'Length is more less than %d'
  },
  esES: {
    REQUIRED: 'Obligatorio',
    MINLENGTH: 'Tamaño es inferior a %d'
  }
};
