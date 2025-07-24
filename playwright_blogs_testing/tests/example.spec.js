// @ts-check
import { test, expect } from '@playwright/test';
const { describe, beforeEach } = test
import helper from '../helper'

describe('when login', () => {
  beforeEach(async ({ page, request }) => {
    await helper.initData(request)
    await page.goto('http://localhost:5173/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  test('login with correct credentials', async({ page }) => {
    const { userName, password, name } = helper.initialUser
    await page.getByRole('textbox').first().fill(userName)
    await page.getByRole('textbox').last().fill(password)
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText(`${name} logged in`)).toBeVisible()
  })

  test('Login with wrong password', async({ page }) => {
    const { userName } = helper.initialUser
    await page.getByRole('textbox').first().fill(userName)
    await page.getByRole('textbox').last().fill('wrong password')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText(`Invalid username or password`)).toBeVisible()
  })

  // test('has title', async ({ page }) => {
  //   await page.goto('http://localhost:5173/');
  
  //   // Expect a title "to contain" a substring.
  //   await expect(page).toHaveTitle(/Playwright/);
  // });
  
  // test('get started link', async ({ page }) => {
  //   await page.goto('https://playwright.dev/');
  
  //   // Click the get started link.
  //   await page.getByRole('link', { name: 'Get started' }).click();
  
  //   // Expects page to have a heading with the name of Installation.
  //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  // });

})
