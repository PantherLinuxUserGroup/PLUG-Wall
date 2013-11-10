var storage = require('../lib/storage');
var fs = require('fs');

describe('storage.file', function(){
  var file = storage.file;

  describe('#storeMessage', function(){
    it('should store a message', function(){
      file.storeMessage('foo', 'Hello World', 'bar');
    })
  })
  describe('#getMessage', function(){
    it('should get the previous message', function(done){
      file.getMessage('foo', function(err, messages){
        if (err) throw err
        messages[0].message.should.equal('Hello World')
        messages[0].user.should.equal('bar')
        done()
      })
    })
  })
  after(function(done){
    fs.unlink('foo', function(err){
      if(err) throw err
      done()
    })
  })
})
