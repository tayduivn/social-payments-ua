import { CssClassNamePipe } from './css-class-name-pipe';

enum TestEnum {
  camelCase,
  UpperCase,
  lower,
  Upper
}

describe('CssClassNamePipe', () => {
  let pipe: CssClassNamePipe;

  beforeEach(() => {
    pipe = new CssClassNamePipe();
  });

  describe('Enum case', () => {
    it('should transform camelCase', () => {
      expect(pipe.transform(TestEnum.camelCase, TestEnum)).toBe('wpa-camel-case');
      expect(pipe.transform(TestEnum.lower, TestEnum)).toBe('wpa-lower');
    });

    it('should transform UpperCase', () => {
      expect(pipe.transform(TestEnum.UpperCase, TestEnum)).toBe('wpa-upper-case');
      expect(pipe.transform(TestEnum.Upper, TestEnum)).toBe('wpa-upper');
    });
  });

  describe('Function case', () => {
    it('should transform UpperCase', () => {
      // arrange
      const TestFunctionName = () => {};

      // act/assert
      expect(pipe.transform(TestFunctionName)).toBe('wpa-test-function-name');
    });
  });
});
