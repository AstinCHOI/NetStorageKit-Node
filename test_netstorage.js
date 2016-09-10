// $ mocha --ui tdd test_netstorage.js

const assert = require('assert'),
    fs = require('fs'),
    Netstorage = require('./lib/netstorage'),
    secrets = require('./spike/secrets');



var NS_HOSTNAME = "astin-nsu.akamaihd.net";
var NS_KEYNAME = "astinastin";
var NS_KEY = secrets.key;
var NS_CPCODE = "360949";


describe('Netstorage test', function() {
  
  var ns = new Netstorage(NS_HOSTNAME, NS_KEYNAME, NS_KEY);
  
  var temp_ns_dir = `/${NS_CPCODE}/nst_${Date.now()}`;
  var temp_file = `nst_${Date.now()}.txt`;
  var temp_ns_file = `${temp_ns_dir}/${temp_file}`;


  after(function(done) {
    fs.unlink(temp_file, (err) => {
      if (!err) {
        console.log(`[TEARDOWN] remove ${temp_file} from local done`); 
      }
      done();
    });
  });

  after(function(done) {
    fs.unlink(`${temp_file}_rename`, (err) => {
      if (!err) {
        console.log(`[TEARDOWN] remove ${temp_file}_rename from local done`);
      }
      done();
    });
  });

  after(function(done) {
    ns.delete(temp_ns_file, (data, response) => {
      if (response.statusCode == 200) {
        console.log(`[TEARDOWN] delete ${temp_ns_file}`);
      }
      done();
    });
  });
  
  after(function(done) {
    ns.delete(`${temp_ns_file}_lnk`, (data, response) => {
      if (response.statusCode == 200) {
        console.log(`[TEARDOWN] delete ${temp_ns_file}_lnk`);
      }
      done();
    });
  });

  after(function(done) {
    ns.delete(`${temp_ns_file}_rename`, (data, response) => {
      if (response.statusCode == 200) {
        console.log(`[TEARDOWN] delete ${temp_ns_file}_rename`);
      }
      done();
    });
  });

  after(function(done) {
    ns.rmdir(temp_ns_dir, (data, response) => {
      if (response.statusCode == 200) {
        console.log(`[TEARDOWN] rmdir ${temp_ns_dir} from local done`);
      }
      done();
    });
  });


  describe(`ns.dir("/${NS_CPCODE}", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.dir(`/${NS_CPCODE}`, (data, response) => {  
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });
  
  describe(`ns.mkdir("${temp_ns_dir}", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.mkdir(temp_ns_dir, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.upload("${temp_file}", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      fs.writeFileSync(temp_file, 'Hello, Netstorage API World!', 'utf8');
      ns.upload(temp_file, temp_ns_file, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.du("${temp_ns_dir}", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.du(temp_ns_dir, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  var mtime_now = Date.now();
  describe(`ns.mtime("${temp_ns_file}", ${mtime_now}, callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.mtime(temp_ns_file, mtime_now, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.stat("${temp_ns_file}", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.stat(temp_ns_file, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.symlink("${temp_ns_file}", "${temp_ns_file}_lnk", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.symlink(temp_ns_file, `${temp_ns_file}_lnk`, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.rename("${temp_ns_file}", "${temp_ns_file}_rename", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.rename(temp_ns_file, `${temp_ns_file}_rename`, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.download("${temp_ns_file}_rename", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.download(`${temp_ns_file}_rename`, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.delete("${temp_ns_file}_rename", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.delete(`${temp_ns_file}_rename`, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.delete("${temp_ns_file}_lnk", callback);`, function() {
    it('should return 200 OK', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.delete(`${temp_ns_file}_lnk`, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

  describe(`ns.rmdir("${temp_ns_dir}", callback);`, function() {
    it('should return 200', function(done) {
      var doneWrap = new DoneWrap(done);
      ns.rmdir(temp_ns_dir, (data, response) => {
        assert.equal(200, response.statusCode);
        doneWrap.trigger();
      });
    });
  });

});

function DoneWrap(done) {
  var self   = this;
  var called = false;

  this.trigger = function (params) {
    if(called) {
        // console.warn("done has already been called");
        // console.trace();
        return;
    }

    done.apply(self, arguments);
    called = true;
  };
}