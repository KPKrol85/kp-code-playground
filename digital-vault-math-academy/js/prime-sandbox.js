document.addEventListener('DOMContentLoaded', () => {
  if (!window.mathUtils) return;

  const { clampNumber, createElement, getDivisors, isPrime, getTestedDivisors, primeFactorization } = window.mathUtils;
  const grid = document.getElementById('number-grid');
  const selectedNumbers = new Set();
  const primeSet = new Set(Array.from({ length: 100 }, (_, i) => i + 1).filter((n) => isPrime(n)));

  function generateGrid() {
    grid.innerHTML = '';
    for (let n = 1; n <= 100; n += 1) {
      const btn = createElement('button', { className: 'number-cell', text: String(n), attrs: { type: 'button', 'data-number': String(n) } });
      if (n === 1) btn.classList.add('is-one');
      btn.addEventListener('click', () => {
        if (selectedNumbers.has(n)) selectedNumbers.delete(n); else selectedNumbers.add(n);
        btn.classList.toggle('is-selected');
      });
      grid.appendChild(btn);
    }
  }

  function paint(predicate, className) {
    grid.querySelectorAll('.number-cell').forEach((cell) => {
      const n = Number(cell.dataset.number);
      if (predicate(n)) cell.classList.add(className);
    });
  }

  function clearPaint() {
    grid.querySelectorAll('.number-cell').forEach((cell) => {
      cell.classList.remove('is-prime', 'is-composite', 'is-selected');
    });
    selectedNumbers.clear();
  }

  document.getElementById('show-primes-btn')?.addEventListener('click', () => paint((n) => isPrime(n), 'is-prime'));
  document.getElementById('show-composites-btn')?.addEventListener('click', () => paint((n) => n > 1 && !isPrime(n), 'is-composite'));
  document.getElementById('clear-grid-btn')?.addEventListener('click', clearPaint);
  document.getElementById('run-sieve-btn')?.addEventListener('click', () => {
    clearPaint();
    for (let n = 2; n <= 100; n += 1) {
      const cell = grid.querySelector(`[data-number='${n}']`);
      if (!cell) continue;
      if (isPrime(n)) cell.classList.add('is-prime'); else cell.classList.add('is-composite');
    }
  });

  document.getElementById('check-training-btn')?.addEventListener('click', () => {
    const selectedPrime = [...selectedNumbers].filter((n) => primeSet.has(n)).length;
    const wrong = [...selectedNumbers].filter((n) => !primeSet.has(n)).length;
    const missed = [...primeSet].filter((n) => !selectedNumbers.has(n)).length;
    document.getElementById('training-result').textContent = `Poprawne zaznaczenia: ${selectedPrime}. Pominięte liczby pierwsze: ${missed}. Błędnie zaznaczone liczby złożone: ${wrong}.`;
  });

  document.getElementById('check-prime-btn')?.addEventListener('click', () => {
    const value = Number(document.getElementById('prime-input').value);
    const n = Math.trunc(clampNumber(value, -999999, 999999));
    const divisors = getDivisors(n);
    const tested = getTestedDivisors(n);
    const prime = isPrime(n);
    const explanation = n < 2
      ? 'Liczba mniejsza niż 2 nie może być pierwsza.'
      : prime
        ? 'Liczba ma dokładnie dwa dzielniki dodatnie: 1 i samą siebie.'
        : 'Liczba ma więcej niż dwa dzielniki dodatnie, więc jest złożona.';
    document.getElementById('prime-result').innerHTML = `<p><strong>Wynik:</strong> ${n} ${prime ? 'jest' : 'nie jest'} liczbą pierwszą.</p><p><strong>Dzielniki:</strong> ${divisors.join(', ') || 'brak'}</p><p><strong>Sprawdzane dzielniki do √n:</strong> ${tested.join(', ') || 'brak'}</p><p>${explanation}</p>`;
  });

  document.getElementById('factor-btn')?.addEventListener('click', () => {
    const n = Math.trunc(Number(document.getElementById('factor-input').value));
    if (n < 2) {
      document.getElementById('factor-result').textContent = 'Podaj liczbę naturalną większą lub równą 2.';
      return;
    }
    const factors = primeFactorization(n);
    document.getElementById('factor-result').textContent = `${n} = ${factors.join(' × ')}`;
  });

  let quizTotal = 0;
  let quizCorrect = 0;
  let quizNumber = 2;
  function nextQuiz() {
    quizNumber = Math.floor(Math.random() * 99) + 2;
    document.getElementById('quiz-number').textContent = String(quizNumber);
    document.getElementById('quiz-result').textContent = '';
  }

  function answerQuiz(answerPrime) {
    const actualPrime = isPrime(quizNumber);
    quizTotal += 1;
    if (answerPrime === actualPrime) quizCorrect += 1;
    const explanation = actualPrime
      ? `${quizNumber} jest pierwsza — dzieli się tylko przez 1 i ${quizNumber}.`
      : `${quizNumber} nie jest pierwsza — ma dodatkowe dzielniki: ${getDivisors(quizNumber).filter((d) => d !== 1 && d !== quizNumber).join(', ')}.`;
    document.getElementById('quiz-result').textContent = `${answerPrime === actualPrime ? 'Dobrze!' : 'Niestety, nie.'} ${explanation}`;
    document.getElementById('quiz-score').textContent = `Wynik: ${quizCorrect}/${quizTotal}`;
  }

  document.getElementById('quiz-yes-btn')?.addEventListener('click', () => answerQuiz(true));
  document.getElementById('quiz-no-btn')?.addEventListener('click', () => answerQuiz(false));
  document.getElementById('quiz-next-btn')?.addEventListener('click', nextQuiz);

  generateGrid();
  nextQuiz();
});
