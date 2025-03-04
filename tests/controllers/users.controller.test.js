import {getUsers} from "../../controllers/users.controller.js";
import User from "../../models/user.model.js";

jest.mock('../../models/user.model.js'); //mock the user model

describe('Users Controller', () => {
    it('should return the all users',async()=>{
        const mockUsers = [{name:"John",email:'6mP5o@example.com'},{name:"Jane",email:'6mP5o@example.com'}]
        await User.find.mockResolvedValue(mockUsers); //mock DB response
        const req ={};
        const res ={json: jest.fn()};

        await getUsers(req,res);
        expect(res.json).toHaveBeenCalledWith(mockUsers);
    })
})