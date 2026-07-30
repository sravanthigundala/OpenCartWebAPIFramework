import { test,expect } from "../src/fixtures/pageFixture";


test.beforeEach(async ({loginPage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin('pwtestbatch@open.com','pw123'); 
});

test('homepage title test', async ({homePage}) => {
    const pageTitle =await homePage.getHomePageTitle();
    console.log('home page title',pageTitle);
    expect(pageTitle).toBe('My Account')
    
});
test('logout link exist test',async ({homePage})=>{
    expect(await homePage.isLogoutLinkExist()).toBeTruthy();
});

test('home page headers exist test',async({homePage})=>{
    let allHeaders = await homePage.getHomePageHeader();
    console.log('home Page headers :',allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([
        'My Account',
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ]);
});
