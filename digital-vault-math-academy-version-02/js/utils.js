function formatNumber(value) {
  return new Intl.NumberFormat('pl-PL').format(value);
}

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function createElement(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function getDivisors(n) {
  const divisors = [];
  for (let i = 1; i <= n; i += 1) {
    if (n % i === 0) divisors.push(i);
  }
  return divisors;
}

function getTestedDivisors(n) {
  const tested = [];
  const limit = Math.floor(Math.sqrt(n));
  for (let i = 2; i <= limit; i += 1) tested.push(i);
  return tested;
}

function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function primeFactorization(n) {
  if (n < 2) return [];
  const factors = [];
  let value = n;
  for (let i = 2; i <= Math.sqrt(value); i += 1) {
    while (value % i === 0) {
      factors.push(i);
      value /= i;
    }
  }
  if (value > 1) factors.push(value);
  return factors;
}

window.MathVaultUtils = { formatNumber, clampNumber, createElement, getDivisors, isPrime, getTestedDivisors, primeFactorization };
