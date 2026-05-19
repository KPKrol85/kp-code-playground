(function () {
  function formatNumber(value) {
    return new Intl.NumberFormat('pl-PL').format(value);
  }

  function clampNumber(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    if (options.className) element.className = options.className;
    if (options.text) element.textContent = options.text;
    if (options.attrs) {
      Object.entries(options.attrs).forEach(([key, val]) => element.setAttribute(key, val));
    }
    return element;
  }

  function getDivisors(n) {
    const num = Math.abs(Math.trunc(n));
    if (num === 0) return [];
    const divisors = [];
    for (let i = 1; i <= num; i += 1) if (num % i === 0) divisors.push(i);
    return divisors;
  }

  function getTestedDivisors(n) {
    const num = Math.abs(Math.trunc(n));
    if (num < 2) return [];
    const limit = Math.floor(Math.sqrt(num));
    const tested = [2];
    if (num === 2) return tested;
    for (let i = 3; i <= limit; i += 2) tested.push(i);
    return tested.filter((x) => x <= limit);
  }

  function isPrime(n) {
    const num = Math.trunc(n);
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    const limit = Math.floor(Math.sqrt(num));
    for (let i = 3; i <= limit; i += 2) if (num % i === 0) return false;
    return true;
  }

  function primeFactorization(n) {
    let num = Math.trunc(n);
    if (num < 2) return [];
    const factors = [];
    while (num % 2 === 0) {
      factors.push(2);
      num /= 2;
    }
    let divisor = 3;
    while (divisor * divisor <= num) {
      while (num % divisor === 0) {
        factors.push(divisor);
        num /= divisor;
      }
      divisor += 2;
    }
    if (num > 1) factors.push(num);
    return factors;
  }

  window.mathUtils = { formatNumber, clampNumber, createElement, getDivisors, isPrime, getTestedDivisors, primeFactorization };
})();
