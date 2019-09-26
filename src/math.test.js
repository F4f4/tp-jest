const Util = require('./math');

test('Test factoriel de 0 => 1', () => {
    expect(Util.factorial(0)).toBe(1);
});

test('Test factoriel de 2 => 2', () => {
    expect(Util.factorial(3)).toBe(6);
});

test('Test factoriel de 3 => 6', () => {
    expect(Util.factorial(3)).toBe(6);
});

test('Test factoriel de 3000', () => {
    expect(()=> {Util.factorial(3000)}).toThrow();
});

test('Test factoriel -10', () => {
    expect(()=> {Util.factorial(-10)}).toThrow(/negative/);
});


describe('isPrime', function () {

    test('Test prime de 1 => false', () => {
        expect(Util.isPrime(1)).toBe(false)
    });
    test('Test prime de 0 => false', () => {
        expect(Util.isPrime(0)).toBe(false)
    });
    test('Test prime < 0 => throw exception', () => {
        expect(() => { Util.isPrime(-10) }).toThrow('Unable to compute prime for n < 0');
    });

    test.each([
        [2, true],
        [5, true],
        [17, true],
        [18, false],
        [53, true],
        [55, false],
    ])(
        'isPrime %i equals to %i',
        (n, expected) => {
            expect(Util.isPrime(n)).toBe(expected);
        }
    );
});

describe('sumPrime', function () {
  test('Test sumPrime de 6 => 10', () => {
    expect(Util.sumPrime(6)).toBe(10)
  });
  test('Test sumPrime de 8 => 17', () => {
    expect(Util.sumPrime(8)).toBe(17)
  });
  test('Test sumPrime de 1 => throw exception', () => {
    expect(() => { Util.sumPrime(1)}).toThrow('Unable to compute sumPrime for n < 2')
  });
});

describe('fizBuzz', function () {
  test('Test fizBuzz de 0 => throw error', () => {
    expect(() => { Util.fizzBuzz(0)}).toThrow('Unable to compute fizzBuzz for n < 0')
  });
  test('Test fizBuzz de 3 => Fizz', () => {
    expect(Util.fizzBuzz(3)).toStrictEqual([1, 2, "Fizz"])
  });
  test('Test fizBuzz de 5 => Buzz', () => {
    expect(Util.fizzBuzz(5)).toStrictEqual([1, 2, "Fizz", 4, "Buzz"])
  });
  test('Test fizBuzz de 15 => FizzBuzz', () => {
    expect(Util.fizzBuzz(15)).toStrictEqual([1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"])
  });
});

describe('cipher', function () {
  test('Test cipher de "Test Unitaire" => "Uftu Vojubjsf"', () => {
    expect(Util.cipher("Test Unitaire")).toBe("Uftu Vojubjsf")
  });
  test('Test cipher de "" => ""', () => {
    expect(Util.cipher("")).toBe("")
  });
  /*test('Test cipher de "1234" => "2345"', () => {
    expect(() => { Util.cipher("12349")}).toThrow('Unable to compute cipher with number')
  });*/
});
