import { test as baseTest } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { CsvHelper } from "../utils/CsvHelper";
import {SearchResultPage } from "../pages/SearchResultPage";
import { BasePage } from "../pages/BasePage";
import { ProductInfoPage } from "../pages/ProductInfoPage";

//DEFINE TYPE FOR PAGE FIXTURES

type  pageFixtures ={
    basePage: BasePage,
    loginPage :LoginPage,
    homePage :HomePage,
    searchResultPage :SearchResultPage,
    productInfoPage: ProductInfoPage,
    testData : Record<string, string>[],
    productData: Record<string,string>[];
};

//EXTEND PLAYWRIGHT BASE TEST

export let test=baseTest.extend<pageFixtures>({

    basePage: async ({ page }, use) => {
        let basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage:async({page},use)=>{
        let loginPage =new LoginPage(page);
        await use(loginPage);
    },

    homePage:async({page},use)=>{
        let homePage =new HomePage(page);
        await use(homePage);
    },

    searchResultPage:async({page},use)=>{
        let searchResultPage =new SearchResultPage(page);
        await use(searchResultPage);
    },

    productInfoPage: async ({ page }, use) => {
        let productInfoPage = new ProductInfoPage(page);
        await use(productInfoPage);
    },


    
    testData:async ({},use) => {
        let testData =CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);
        
    },

    productData: async ({}, use) => {
         console.log("Reading product CSV");
    const productData = CsvHelper.readCsv('src/data/product.csv');
    await use(productData);

}

});

export{expect} from '@playwright/test';
