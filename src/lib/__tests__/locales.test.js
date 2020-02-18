import locales from '../locales';

describe('Locales unit test', () => {
  it('Should render default (enUS) if lang not exists', () => {
    const result = locales('abc').REQUIRED;
    expect(result).toBe('Required');
  })

  it('Should render ptBR lang', () => {
    const result = locales('ptBR').MINLENGTH;
    expect(result).toBe('Tamanho é menor que %d');
  })
})
