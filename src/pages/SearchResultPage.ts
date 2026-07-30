import { Locator,Page} from "@playwright/test";
import { BasePage } from "./BasePage";

export class SearchResultPage extends BasePage{
    
    //private Locators
    private readonly SearchResults:Locator;

    //const.. of the class :init the locators

    constructor (page:Page){
        super(page);
        this.SearchResults =page.locator('div.product-layout');

    };

    //actions
    async getProductSearchResultCount():Promise<number>{
        return await this.SearchResults.count();
    }

    async selectProduct(productName:string):Promise<void>{
        await this .page.getByRole('link',{name:productName,exact:true}).first().click();

    }


    }
