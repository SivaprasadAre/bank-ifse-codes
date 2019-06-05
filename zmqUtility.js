var zmq = require('zmq'),
  pull = zmq.socket("pull"),
  push = zmq.socket("push"),
  sub = zmq.socket("sub"),
  pub = zmq.socket("pub");
var config = require('config');
pull.connect(config.zmqConnections.pull);
push.bindSync(config.zmqConnections.push);
sub.connect(config.zmqConnections.sub);
pub.bindSync(config.zmqConnections.pub);
function ZmqUtility() {
}
ZmqUtility.prototype.pull = function (callback) {
  pull.on('message', function (msg) {
    callback(msg);
  });
};
ZmqUtility.prototype.push = function (data) {
  push.send(JSON.stringify(data));
};
ZmqUtility.prototype.pub = function (name, data) {
  pub.send([name, JSON.stringify(data)]);
};
ZmqUtility.prototype.sub = function (callback) {
  sub.on('message', function (topic, message) {
    callback(message);
  });
};

ZmqUtility.prototype.sendMessage = function (data, callback) {
  log.info("This is EmailEngineModel sendMessage function...", { data: data });
  var emailData = _.pick(data, ['from', 'to', 'message_type', 'shareInterviewdata', 'date', 'subject', 'engine', 'test', 'message', 'name']);
  if (emailData.message_type && emailData.to) {
    this.pub('engine', emailData);
    log.info("This is EmailEngineModel and successfully send the email");
    callback(null, { code: 200, message: "success" });
  } else {
    log.info("This is EmailEngineModel sendMessage function.Requires all fields");
    callback({ code: 406, message: "required fields" });
  }
};
module.exports = ZmqUtility; 
