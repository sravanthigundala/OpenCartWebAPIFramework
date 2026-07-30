import { test,expect } from "@playwright/test";

let AUTH_TOKEN ={Authorization :'Bearer 76a56f437ccf9df5855b0bc0c84a437efc0e2ad3067c29ad4ba029f294b3b04d'};

test('get user test',async ({request}) => {

    let response =await request.get('https://gorest.co.in//public/v2/users',{
        headers:AUTH_TOKEN
    });

    //console.log(response);

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);
    
});

test('create a user test',async({request})=>{

    //JS object

    let userData ={
        name :'shalini',
        email :`automation_${Date.now()}@open.com`,
        gender: 'female',
        status :'active'
    };

    //JS object to Json serialization
    let response =await request.post('https://gorest.co.in//public/v2/users',{
        headers:AUTH_TOKEN,
        data:userData
    });

    //console.log(response);

    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(201);
    
});

test.skip('update a user test',async ({request}) => {
    
    //Js object
    let userData ={
        name :'shalini Kondepudi',
        email :`automation_${Date.now()}@open.com`,
        gender: 'female',
        status :'active'
    };

    //console.log(response);
//JS object to Json serialization
    let response =await request.put('https://gorest.co.in//public/v2/users/8557626',{
        headers:AUTH_TOKEN,
        data:userData
    });
    let jsonBody = await response.json();
    console.log(jsonBody);

    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(200);   
});

test.skip('Delete a user test',async ({request}) => {
//JS object to Json serialization
    let response =await request.delete('https://gorest.co.in//public/v2/users/8557626',{
        headers:AUTH_TOKEN
       
    });
   

    console.log(response.status());
    console.log(response.statusText());
    expect(response.status()).toBe(204);   
});

    



