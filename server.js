var http = require('http');
var express = require('express');
var moment = require("moment");
var router = express();
var server = http.createServer(router);
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
router.get("/:timestamp", function(req, res) {
  var timestamp = req.params.timestamp;
  if (timestamp.indexOf(",") !== -1) {
    var dateObj = moment(new Date(timestamp));
    var natural = monthNames[dateObj.month()] + " " + dateObj.format("D") + ", " + dateObj.year();
    if (natural.indexOf("undefined") !== -1) {
      res.json({unix: null, natural: null});
    } else {
      res.json({unix: dateObj.unix(), natural: natural});
    }
  } else {
    var unix = Number(timestamp);
    var dateObj = moment(unix * 1000);
    var natural = monthNames[dateObj.month()] + " " + dateObj.format("D") + ", " + dateObj.year();
    if (natural.indexOf("undefined") !== -1) {
      res.json({unix: null, natural: null});
    } else {
      res.json({unix: unix, natural: natural});
    }
  }
});
router.get("/", function(req, res) {
  res.json({unix: null, natural: null});
});
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){});