import { test as setup, expect } from '@playwright/test';
import path from 'path';
import helper from '../helper'

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page, request }) => {
  // Perform authentication steps. Replace these actions with your own.
  await helper.initData(request)
  await page.goto('http://localhost:5173/');
  const { userName, password, name } = helper.initialUser
  await page.getByRole('textbox').first().fill(userName)
  await page.getByRole('textbox').last().fill(password)
  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByText(`${name} logged in`)).toBeVisible()

  await page.context().storageState({ path: authFile });
});