import locales from '../locales';

describe('Locales unit test', () => {
  it('Should render default (enUS) if lang not exists', () => {
    const result = locales('abc').REQUIRED;
    expect(result).toBe('Please fill out this field.');
  })

  it('Should render ptBR lang', () => {
    const result = locales('ptBR').TOOSHORT;
    expect(result).toBe('Tamanho é menor que %d.');
  })
})
