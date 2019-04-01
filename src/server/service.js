const http = require('http');

const quote = {
  random: (success) => {
    http.get('http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => success(JSON.parse(data)[0].content));
    });
  },
};

module.exports.quote = quote;
