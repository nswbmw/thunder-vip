'use strict';

var cheerio = require('cheerio');
var request = require('request');

var URL = 'http://www.fenxs.com/';

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
        if (text.match(/^分享社迅雷会员账号/)) {
          accounts = accounts.concat(text.split('\n').map(format));
        }
      });
      cb(null, accounts);
    });
  });
};

function format(str) {
  var obj = {};
  var match = str.match(/分享社迅雷会员账号(.+)密码(.+)/);
  obj.user = match[1].trim();
  obj.password = match[2].trim();
  return obj;
}