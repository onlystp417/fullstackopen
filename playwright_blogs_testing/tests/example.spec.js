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
      await helper.addBlog(page)
    })

    test('Blog can be added and liked', async ({ page }) => {
      const newBlog = await page.getByText('New Blog 1')
      await newBlog.getByRole('button', { name: 'view' }).click()
      await newBlog.locator('..').getByTestId('likes-btn').click()

      await expect(newBlog.locator('..').getByText('Likes: 1')).toBeVisible()
    })

    test('Blog can be deleted by author', async ({ page }) => {
      await page.getByText('New Blog 1').getByTestId('delete-btn').click()
      setTimeout(async () => {
        expect(await page.getByText('New Blog 1').getByRole('button', { name: 'view' })).toHaveCount(0)
      }, 1000)
    })

    test('Delete btn invisible to non-author', async ({ page, request }) => {
      const newUser = {
        name: 'Jinwen Hsieh',
        userName: 'onlystp',
        password: 'bilibala7788'
      }
      await page.getByRole('button', { name: 'log out'}).click()
      await request.post('http://localhost:3001/api/users', { data: newUser })

      await page.getByRole('textbox').first().fill(newUser.userName)
      await page.getByRole('textbox').last().fill(newUser.password)
      await page.getByRole('button', { name: 'Login' }).click()

      expect(await page.getByText('New Blog 1').getByTestId('delete-btn')).toHaveCount(0)
    })
  })
})
