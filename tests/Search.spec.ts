import { test,expect } from "../src/fixtures/pageFixture";
import { SearchResultPage } from "../src/pages/SearchResultPage";
import { CsvHelper } from "../src/utils/CsvHelper";

test.beforeEach(async ({loginPage}) => {
    await loginPage.goToLoginPage();
    await loginPage.doLogin(process.env.APP_USERNAME!,process.env.APP_PASSWORD!);
    
});

//Dataprovider
const ProductData = CsvHelper.readCsv('src/data/product.csv');
for(const row of ProductData){

test(`@regression Verify search count-${row.searchkey}-${row.productname}`,async ({homePage,searchResultPage})=>{
    await homePage.doSearch(row.searchkey);
    expect(await searchResultPage.getProductSearchResultCount()).toBe(Number(row.resultcount));
});
}

for(const row of ProductData){

    test(`@regression verify user is able to land on the product page-${row.searchKey}-${row.productname}`,async ({homePage,searchResultPage,page}) => {
        await homePage.doSearch(row.searchkey);
        await searchResultPage.selectProduct(row.productname);
        expect(await page.title()).toBe(row.productname);
    });
}
test('@smoke comp logo exists on product page', async ({ basePage}) => {
    expect(await basePage.isLogoVisible()).toBeTruthy();
});

test('@smoke footers exist on product page', async ({ basePage }) => {
    expect(await basePage.getPageFootersCount()).toBe(16);
});
    

