import { expect, test } from '@playwright/test';
import { loginDemoUser, resetBrowserState } from '../helpers/e2e.js';

test.beforeEach(async ({ page }) => {
  await resetBrowserState(page);
});

test('user can log in with valid demo input', async ({ page }) => {
  await loginDemoUser(page);

  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  await expect(page).toHaveURL(/#\/dashboard/);
});

test('user can add a client', async ({ page }) => {
  await loginDemoUser(page);

  await page.getByRole('link', { name: /Klienci/ }).click();
  await page.getByRole('button', { name: 'Dodaj klienta' }).click();
  await page.getByLabel('Nazwa').fill('Acme Service E2E');
  await page.getByLabel('Email').fill('e2e-client@flowdesk.test');
  await page.getByLabel('Telefon').fill('+48 500 100 300');
  await page.getByLabel('Notatki').fill('Created by Playwright');
  await page.getByRole('button', { name: 'Zapisz' }).click();

  await expect(page.getByText('Acme Service E2E')).toBeVisible();
  await expect(page.getByText('e2e-client@flowdesk.test')).toBeVisible();
});

test('user can add a project', async ({ page }) => {
  await loginDemoUser(page);

  await page.getByRole('link', { name: /Zlecenia/ }).click();
  await page.getByRole('button', { name: 'Dodaj zlecenie' }).click();
  await page.getByLabel('Nazwa').fill('E2E Service Job');
  await page.getByLabel('Termin').fill('2026-08-12');
  await page.getByLabel('Notatki').fill('Created by Playwright');
  await page.getByRole('button', { name: 'Zapisz' }).click();

  await expect(page.getByText('E2E Service Job')).toBeVisible();
});

test('user can export JSON data', async ({ page }) => {
  await loginDemoUser(page);

  await page.getByRole('link', { name: /Ustawienia/ }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Eksportuj JSON' }).click();
  const download = await downloadPromise;

  expect(download.suggestedFilename()).toBe('flowdesk-data.json');
});

test('user can switch theme', async ({ page }) => {
  await loginDemoUser(page);

  await page.getByRole('link', { name: /Ustawienia/ }).click();
  await page.getByLabel('Motyw ciemny').check();

  await expect(page.locator('body')).toHaveClass(/theme-dark/);
});
