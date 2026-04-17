## PR Checklist (kp-code-playground)

> Cel: uniknąć sytuacji, w której zmiany trafiają do złego branchu docelowego.

### 1) Branch i zakres zmian
- [ ] Pracuję na branchu roboczym (feature/codex), **nie bezpośrednio na `main`**.
- [ ] Zmiany dotyczą tylko tego zadania.
- [ ] `git status` jest czysty lub zawiera tylko pliki z tego zadania.

### 2) Ustawienia PR na GitHub (NAJWAŻNIEJSZE)
- [ ] **Base branch = `main`**.
- [ ] **Compare branch = mój branch roboczy**.
- [ ] Widzę poprawny kierunek: `main <- mój-branch`.

### 3) Szybka weryfikacja przed merge
- [ ] Opis PR jasno mówi, co zostało zmienione.
- [ ] CI/checki są zielone (jeśli dotyczy).
- [ ] Sprawdziłem diff i nie ma przypadkowych plików.

### 4) Po merge
- [ ] Przełączam się na `main` lokalnie: `git checkout main`.
- [ ] Aktualizuję lokalne `main`: `git pull`.
- [ ] Potwierdzam, że zmiany są na `main`.

---

### Skrót komend (lokalnie)
```bash
git branch --show-current
git status
git checkout main
git pull
```
