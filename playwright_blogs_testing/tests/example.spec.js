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
      await page.getByRole('button', { name: 'Add blog' }).click()
      await helper.addBlog(page, helper.initialBlog)
    })

    test('Blog can be added and liked', async ({ page }) => {
      const newBlog = await page.getByText('New Blog 1')
      await newBlog.getByRole('button', { name: 'view' }).click()
      await newBlog.locator('..').getByTestId('likes-btn').click()

      await expect(newBlog.locator('..').getByText('Likes: 1')).toBeVisible()
    })

    test('Blog can be deleted by author', async ({ page }) => {
      await page.getByText('New Blog 1').getByTestId('delete-btn').click()
      const newBlog = await page.getByText('New Blog 1')
      await expect(newBlog.getByRole('button', { name: 'view' })).toHaveCount(0)
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

      await expect(page.getByText('New Blog 1').getByTestId('delete-btn')).toHaveCount(0)
    })

    test('Blogs to be sorted correctly', async ({ page }) => {
      const newBlogs = [
        { title: 'New Blog 2', author: 'GengBai Lin', url: 'blogs/2', likes: 9 },
        { title: 'New Blog 3', author: 'GengBai Lin', url: 'blogs/3', likes: 4 },
        { title: 'New Blog 4', author: 'GengBai Lin', url: 'blogs/4', likes: 20 },
        { title: 'New Blog 5', author: 'GengBai Lin', url: 'blogs/5', likes: 17 },
      ]

      for (const blog of newBlogs) {
        await helper.addBlog(page, blog)
      }

      for(let i=1; i<=15; i++) {
        const index = Math.floor(Math.random() * 5)
        // console.log('index', index)
        const blogTitle = newBlogs[index].title
        const blog = await page.getByText(blogTitle)
        await blog.getByRole('button', { name: 'view' }).click()
        await blog.locator('..').getByTestId('likes-btn').click()
        // console.log('title', blogTitle)
      }

      const blogLocators = await page.locator('.blog')
      const blogs = await blogLocators.evaluateAll(blogElements =>
        blogElements.map(el => el.textContent)
      )
    })
  })
})
