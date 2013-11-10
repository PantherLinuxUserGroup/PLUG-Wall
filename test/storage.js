var storage = require('../lib/storage');

describe('storage', function(){
  it('should have a file storage property', function(){
    storage.should.have.property('file')
  })
  it('should have a memory storage property', function(){
    storage.should.have.property('memory')
  })
})
