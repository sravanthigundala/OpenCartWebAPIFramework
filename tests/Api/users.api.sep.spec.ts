import { test,expect } from "../../src/fixtures/ApiFixtures";

const TOKEN = process.env.API_TOKEN!;

let AUTH_HEADER ={Authorization :`Bearer ${TOKEN}`};

let userId:number;

test.describe.serial('running e2e gorest crud api test',()=>{

//GET TEST
test('@regression GET API--get all users',async ({apiHelper}) => {
    let response =await apiHelper.get('/public/v2/users', AUTH_HEADER);
    console.log("Status:", response.status);
    console.log("Body:", response.body);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);   
});

test('@regression POST API---create auser',async({apiHelper})=>{
    let userData ={
        name :'sravya',
        email :`automation_${Date.now()}@open.com`,
        gender: 'female',
        status :'active'
    };

    let response =await apiHelper.post('/public/v2/users',userData, AUTH_HEADER);
    expect(response.status).toBe(201);  
    expect(response.body.name).toBe(userData.name); 
    
    userId =response.body.id;
    console.log('created user Id :',userId);
});

test('@regression PUT API---create auser',async({apiHelper})=>{
    let userUpdatedData ={
        name :'sravya nayak',
        email :`automation_${Date.now()}@open.com`,
        gender: 'female',
        status :'active'
    };

    let response =await apiHelper.put(`/public/v2/users/${userId}`,userUpdatedData,AUTH_HEADER);
    expect(response.status).toBe(200);  
    expect(response.body.name).toBe(userUpdatedData.name); 
    expect(response.body.status).toBe(userUpdatedData.status);
});

test('@regression DELETE API---create auser',async({apiHelper})=>{
    let response =await apiHelper.delete(`/public/v2/users/${userId}`, AUTH_HEADER);
    expect(response.status).toBe(204);  
});

});