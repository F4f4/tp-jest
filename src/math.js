let Util = {};
Util.factorial = (n) => {
    if (n === 0) {
        return 1;
    }

    if (n >= 3000) {
        throw 'n too large'
    }

    if (n < 0) {
        throw 'n is negative'
    }

    return n * Util.factorial(n - 1);
};

/**
 * Détermine si n est un nombre premier.
 * Util.isPrime(5) => false
 * Util.isPrime(6) => true
 *
 * @param {number} n
 * @returns {boolean}
 */
Util.isPrime = function (n) {
    if (n === 1 || n === 0) {
        return false;
    }
    if (n < 0) {
        throw 'Unable to compute prime for n < 0'
    }
    for (var i = 2; i < n; i++)
        if (n % i === 0) return false;
    return true;

};


/**
 * Additionne l'ensemble des nombres premiers de 2 à n
 *
 * Util.sumPrime(6) = 2 + 3 + 5 = 10
 * Util.sumPrime(8) = 2 + 3 + 5 + 7 = 17
 *
 * @param {number} n
 * @returns {number}
 */
Util.sumPrime = function(n) {
  if(n < 2){
    throw 'Unable to compute sumPrime for n < 2'
  }
  var sum = 0;
  for( var i = 2; i < n; i++){
    if(Util.isPrime(i)){
      sum += i;
    }
  }
  return sum;

};

/**
 * Cette méthode doit retourner un tableau de 1 à n tel que:
 * - Pour les nombres multiples de 3, les remplacer par "Fizz"
 * - Pour les nombres multiples de 5, les remplacer par "Buzz"
 * - Pour les nombres multiples de 3 et 5, les remplacer par "FizzBuzz"
 *
 * Exp :
 * Util.fizzBuzz(15) => [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
 *
 * @param {number} n
 * @returns {array}
 */
Util.fizzBuzz = function(n) {
  if(n <= 0){
    throw 'Unable to compute fizzBuzz for n < 0'
  }

  let ret = [];

  for (var i = 1; i <= n; i++){
    var test = "";
    test += (i % 3) === 0 ? "Fizz" : "";
    test += (i % 5) === 0 ? "Buzz" : "";
    ret.push(test !== "" ? test : i);
  }
  return ret;
};

/**
 * Chiffre une phrase selon la règle suivante : Les A deviennent des B, les B des C, etc.
 *
 * Exp :
 * Util.cipher("Test Unitaire") => "Uftu Tojubjsf"
 *
 * @param phrase
 * @returns {string}
 */
Util.cipher = function (phrase) {
  var len = phrase.length;
  var ret = "";
  if (len > 0) {
    for (const lettre of phrase) {
      if (lettre typeof( Number)) {
        throw 'Unable to compute cipher with number'
      }
      if (lettre === 'z') ret += 'a';
      else if (lettre === 'Z') ret += 'A';
      else if (lettre === " ") ret += " ";
      else {
        ret += String.fromCharCode(lettre.charCodeAt() + 1);
      }
    }
  }
  return ret;
};


module.exports = Util;

