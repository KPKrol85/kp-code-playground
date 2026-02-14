import storage from './storage.js';

const STORAGE_KEY = 'ambient-dev-panel:stats';

export function createStatsController({ todayElement, totalElement }) {
  const todayDate = new Date().toISOString().slice(0, 10);
  const data = storage.get(STORAGE_KEY, {
    total: 0,
    today: 0,
    date: todayDate,
  });

  if (data.date !== todayDate) {
    data.today = 0;
    data.date = todayDate;
  }

  const render = () => {
    todayElement.textContent = String(data.today);
    totalElement.textContent = String(data.total);
  };

  const increment = () => {
    data.total += 1;
    data.today += 1;
    storage.set(STORAGE_KEY, data);
    render();
  };

  render();

  return { increment };
}
