// @ts-check
import { test, expect } from '@playwright/test';
const { describe, beforeEach } = test
import helper from '../helper'

describe('when login', () => {
  beforeEach(async ({ page, request }) => {
    await helper.initData(request)
    await page.goto('http://localhost:5173/')
  });
  
  test('Login form is shown', async ({ page, request }) => {
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  test('login with correct credentials', async({ page }) => {
    const name = await helper.login(page)
    await expect(page.getByText(`${name} logged in`)).toBeVisible()
  })

  test('Login with wrong password', async({ page }) => {
    const { userName } = helper.initialUser
    await page.getByRole('textbox').first().fill(userName)
    await page.getByRole('textbox').last().fill('wrong password')
    await page.getByRole('button', { name: 'Login' }).click()

    await expect(page.getByText(`Invalid username or password`)).toBeVisible()
  })

  describe('Logged in, and do...', () => {
    beforeEach(async ({ page }) => {
      await helper.login(page)
    })

    test('Blog can be liked', async ({ page, request }) => {
      await page.getByRole('button', { name: 'Add blog' }).click()
      await page.getByText('Title: ').locator('..').getByRole('textbox').fill('New Blog 1')
      await page.getByText('Author: ').locator('..').getByRole('textbox').fill('GengBai Lin')
      await page.getByText('URL: ').locator('..').getByRole('textbox').fill('medium.com/new_blog_1')
      await page.getByRole('button', { name: 'Create' }).click()

      const newBlog = await page.getByText('New Blog 1')
      await newBlog.getByRole('button', { name: 'view' }).click()
      await newBlog.locator('..').getByTestId('likes-btn').click()

      await expect(newBlog.locator('..').getByText('Likes: 1')).toBeVisible()
    })
  })

})
