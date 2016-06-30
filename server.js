var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req, res) {

            url = 'https://origin-web-scraping.herokuapp.com/';

            request(url, function(error, response, html) {
                if (!error) {
                    var $ = cheerio.load(html);

                    var name, imageUrl, author, price;
                    var json = { name: "", imageURL: "", author: "", price: "" };

                    $('.panel').each(function() {
                        var data = $(this);
                        var name = data.children().first().text().replace(/(\n)/, '').trim();
                        var imageUrl = data.children().eq(1).children().first().attr('src');
                        var author = data.children().eq(1).children().eq(1).text();
                        var price = data.children().eq(1).children().eq(2).text();
                        var json = { name: name, imageUrl: imageUrl, author: author, price: price };

                        jsonFULL.push(json);
                    });
                }



                // To write to the system we will use the built in 'fs' library.
                // In this example we will pass 3 parameters to the writeFile function
                // Parameter 1 :  output.json - this is what the created filename will be called
                // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
                // Parameter 3 :  callback function - a callback function to let us know the status of our function

                fs.writeFile('books.json', JSON.stringify(json, null, 4), function(err) {

                    console.log('File successfully written! - Check your project directory for the books.json file');

                })

                res.send('Check your console!')

            }) ;

        })

app.listen('8100')
console.log('Revert to 8100');
exports = module.exports = app;
