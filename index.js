'use strict';

var cheerio = require('cheerio');
var request = require('request');

var URL = 'http://www.fenxs.com/';
var REGEXP = /([0-9a-z_]+:[12])[^0-9]+([0-9]+)/;

module.exports = function thunderVip(cb) {
  request(URL, function (err, res, body) {
    if (err) return cb(err);
    var $ = cheerio.load(body);
    var url = $('.content>article.excerpt').first().find('a').first().attr('href');
    request(url, function (err, res, body) {
      if (err) return cb(err);
      $ = cheerio.load(body);
      var accounts = [];
      $('article.article-content p').each(function () {
        var text = $(this).text().trim();
        if (text.match(REGEXP)) {
          accounts = accounts.concat(text.split('\n').map(format));
        }
      });
      cb(null, accounts);
    });
  });
};

module.exports.REGEXP = REGEXP;

function format(str) {
  var obj = {};
  var match = str.match(REGEXP);
  obj.user = match[1].trim();
  obj.password = match[2].trim();
  return obj;
}