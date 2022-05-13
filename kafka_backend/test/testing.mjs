import axios from 'axios';
import assert from 'assert';
//Testing Login for customers.
describe('POST login API call',()=>{
    const dummyUser = {email:"siril@gmail.com",password:"Git@m123"};
    it('should return login successful message',async()=>{
        const response = await axios.post('http://localhost:3000/api/login',dummyUser);
        assert.strictEqual(response.status,200)
    });
});
//Testing API for most viewed questions.
describe('Most Viewed Questions',()=>{
    it('should return most viewed questions',async()=>{
        const response = await axios.get('http://localhost:3000/api/mostViewedQuestions');
        assert.strictEqual(response.status,200)
    });
});
//Testing API for count of questions posted.
describe('Count of questions Posted',()=>{
    it('should return count of questions posted',async()=>{
        const response = await axios.get('http://localhost:3000/api/questionPostedCount');
        assert.strictEqual(response.status,200)
    });
});
//Testing API for getting user details.
describe('Getting User Details',()=>{
    it('should return User Details',async()=>{
        const response = await axios.get('http://localhost:3000/api/getUserDetails');
        assert.strictEqual(response.status,200)
    });
});
//Testing Top User Reputation API
describe('Getting the Top User Reputation',()=>{
    it('should return top user reputation details',async()=>{
        const response = await axios.get('http://localhost:3000/api/getTopUserReputation');
        assert.strictEqual(response.status,200)
    });
});
//Testing least User Reputation API
describe('Getting the least User Reputation Details',()=>{
    it('should return least User reputation Details',async()=>{
        const response = await axios.get('http://localhost:3000/api/getLeastUserReputation');
        assert.strictEqual(response.status,200)
    });
});
//Testing get all Tags API
describe('Getting All Tags of User',()=>{
    it('should return All Tags',async()=>{
        const response = await axios.get('http://localhost:3000/api/tags/getAllTags');
        assert.strictEqual(response.status,200)
    });
});
//Testing Popular Tags API
describe('Getting Popular Tags of User',()=>{
    it('should return Popular Tags',async()=>{
        const response = await axios.get('http://localhost:3000/api/tags/getPopularTags');
        assert.strictEqual(response.status,200)
    });
});
//Loading questions
describe('get the questions',()=>{
    it('should return login questions',async()=>{
        // let answer = "627749892acbb501d4d078c1"
        const response = await axios.get('http://localhost:3000/api/v1/questions');
        assert.strictEqual(response.status,200)
    });
});
//Testing for get User Details
describe('Getting User Details',()=>{
    it('should return User Details',async()=>{
        const response = await axios.get('http://localhost:3000/api/');
        assert.strictEqual(response.status,200)
    });
});


