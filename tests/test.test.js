import { setupTest,createPage } from '@nuxt/test-utils'
process.env = Object.assign(process.env, { GITPOD_WORKSPACE_URL: 'https://blush-swift-41hbpvff.ws-us16.gitpod.io' });
describe('My test', () => {
  setupTest({
    server:true
  })
  test('mi test', async () => {
    const page = await createPage('/login')
    const body = await page.innerHTML('body')
console.log(page)

  })

})

