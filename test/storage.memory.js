var storage = require('../lib/storage');

describe('storage.memory', function(){
  var memory = storage.memory;
  describe('#storeMessage', function(){
    it('should store a message', function(){
      memory.storeMessage('foo', 'Hello World', 'bar');
    })
  })
  describe('#getMessage', function(){
    it('should get the previous message', function(done){
      memory.getMessage('foo', function(err, messages){
        if (err) throw err
        messages[0].message.should.equal('Hello World')
        messages[0].user.should.equal('bar')
        done()
      })
    })
  })
})
