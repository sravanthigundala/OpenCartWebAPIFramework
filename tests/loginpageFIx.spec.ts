import { test,expect } from "../src/fixtures/pageFixture";
import { CsvHelper } from "../src/utils/CsvHelper";
import { ExcelHelper } from "../src/utils/ExcelHelper";
import { JsonHelper } from "../src/utils/jsonHelper";


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goToLoginPage();
    
});

test('login page title test', async ({loginPage}) => {
    const pageTitle = await loginPage.getPageTitle();
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgot pwd link exist test', async ({loginPage}) => {
    expect(await loginPage.isForgotPwdLinkExist()).toBeTruthy();
});

test('user is able to login to app test', async ({loginPage,homePage}) => {
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
    //await loginPage.doLogin('pwtestbatch@open.com', 'pw123');
    expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
    expect .soft(await homePage.getHomePageTitle()).toBe('My Account');
});


//DD_1.sequence mode -- only 1 test is running with test data one by one using testData from fixture

test('login to app using wrong credentials with Data driven test', async ({ loginPage, testData }) => {
    for (let row of testData) {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    }
});

//DD_2: without fixtures, parallel mode. read csv data directly and loop the test method row wise...
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for (let row of testData) {
    test(`invalid login test with - ${row.username} - ${row.password}`, async ({ loginPage }) => {
        await loginPage.doLogin(row.username, row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
    });
};

//ms.excel -office latest
//xlsx format
//maintenance-high

let loginTestData =ExcelHelper.readExcel('src/data/openCartTestData.xlsx');
for(let row of loginTestData){

    test(`invalid login test with excel data-${row.username}`,async ({loginPage}) => {

        await loginPage.doLogin(row.username,row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
        
    });

};

//json

let loginJSONData =JsonHelper.readJson('src/data/logindata.json');
for(let row of loginJSONData){

    test(`invalid login test with JSON data-${row.username}`,async ({loginPage}) => {

        await loginPage.doLogin(row.username,row.password);
        expect(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
        
    });

};
    


