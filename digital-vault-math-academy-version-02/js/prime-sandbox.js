document.addEventListener('DOMContentLoaded', () => {
  const { isPrime, getDivisors, getTestedDivisors, primeFactorization, createElement, clampNumber } = window.MathVaultUtils;
  const grid = document.getElementById('number-grid');
  if (!grid) return;

  const selected = new Set();
  const quizState = { total: 0, correct: 0, current: 2 };

  function renderGrid() {
    grid.innerHTML = '';
    for (let n = 1; n <= 100; n += 1) {
      const btn = createElement('button', 'number-cell', String(n));
      btn.type = 'button';
      if (n === 1) btn.classList.add('one');
      if (selected.has(n)) btn.classList.add('selected');
      btn.addEventListener('click', () => {
        if (selected.has(n)) selected.delete(n); else selected.add(n);
        renderGrid();
      });
      grid.appendChild(btn);
    }
  }

  function classifyGrid(type) {
    [...grid.children].forEach((cell, idx) => {
      const n = idx + 1;
      cell.classList.remove('prime', 'composite');
      if (n > 1 && type === 'prime' && isPrime(n)) cell.classList.add('prime');
      if (n > 1 && type === 'composite' && !isPrime(n)) cell.classList.add('composite');
    });
  }

  function runSieveVisual() {
    [...grid.children].forEach((cell) => cell.classList.remove('prime', 'composite'));
    for (let n = 2; n <= 100; n += 1) {
      const cell = grid.children[n - 1];
      if (isPrime(n)) cell.classList.add('prime');
      else cell.classList.add('composite');
    }
  }

  document.getElementById('check-prime-btn').addEventListener('click', () => {
    const input = clampNumber(Number(document.getElementById('prime-input').value || 0), 0, 100000);
    const result = document.getElementById('prime-result');
    const divisors = input > 0 ? getDivisors(input) : [];
    const tested = input >= 2 ? getTestedDivisors(input) : [];
    result.innerHTML = `<p><strong>${input}</strong> ${isPrime(input) ? 'jest liczbą pierwszą.' : 'nie jest liczbą pierwszą.'}</p>
      <p>Dzielniki: ${divisors.join(', ') || 'brak'}</p>
      <p>Sprawdzane dzielniki do √n: ${tested.join(', ') || 'brak'}</p>`;
  });

  document.getElementById('factor-btn').addEventListener('click', () => {
    const n = clampNumber(Number(document.getElementById('factor-input').value || 0), 0, 100000);
    const factors = primeFactorization(n);
    document.getElementById('factor-result').textContent = factors.length ? `${n} = ${factors.join(' × ')}` : 'Podaj liczbę całkowitą większą lub równą 2.';
  });

  document.getElementById('show-primes').addEventListener('click', () => classifyGrid('prime'));
  document.getElementById('show-composites').addEventListener('click', () => classifyGrid('composite'));
  document.getElementById('run-sieve').addEventListener('click', runSieveVisual);
  document.getElementById('clear-grid').addEventListener('click', () => {
    selected.clear();
    renderGrid();
    document.getElementById('training-result').textContent = 'Wyczyszczono siatkę.';
  });

  document.getElementById('check-selection').addEventListener('click', () => {
    const primes = [];
    for (let i = 2; i <= 100; i += 1) if (isPrime(i)) primes.push(i);
    const correct = primes.filter((n) => selected.has(n));
    const missed = primes.filter((n) => !selected.has(n));
    const wrong = [...selected].filter((n) => n === 1 || !isPrime(n));
    document.getElementById('training-result').innerHTML = `Poprawne: ${correct.length}. Pominięte pierwsze: ${missed.join(', ') || 'brak'}. Błędnie zaznaczone: ${wrong.join(', ') || 'brak'}.`;
  });

  function nextQuiz() {
    quizState.current = Math.floor(Math.random() * 99) + 2;
    document.getElementById('quiz-question').textContent = `Czy liczba ${quizState.current} jest pierwsza?`;
  }

  function answerQuiz(answerPrime) {
    const prime = isPrime(quizState.current);
    quizState.total += 1;
    if (prime === answerPrime) quizState.correct += 1;
    const explanation = prime ? 'To liczba pierwsza: ma dwa dodatnie dzielniki.' : `To liczba złożona. Dzielniki: ${getDivisors(quizState.current).join(', ')}.`;
    document.getElementById('quiz-result').textContent = explanation;
    document.getElementById('quiz-score').textContent = `Wynik: ${quizState.correct}/${quizState.total}`;
  }

  document.getElementById('quiz-yes').addEventListener('click', () => answerQuiz(true));
  document.getElementById('quiz-no').addEventListener('click', () => answerQuiz(false));
  document.getElementById('quiz-next').addEventListener('click', nextQuiz);

  renderGrid();
  nextQuiz();
});
