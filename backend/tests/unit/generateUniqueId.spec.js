const generateUniqueId = require("../../src/util/generateUniqueId")

describe('Generate unique ID',()=>{
    it('should generate an unique id', ()=>{
        const id= generateUniqueId()
        expect(id).toHaveLength(8)
        // expect(2+2).toBe(4)
    })
})