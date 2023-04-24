var http = require('http');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) 
  {
	  if (req.url == "/track")
	  {
		  file = 'track.html';
		  fs.readFile(file, function(err, txt) {
    	  res.writeHead(200, {'Content-Type': 'text/html'});
          res.write(txt);
          res.end();
		  });
        
		 pdata = "";
		 req.on('data', data => {
           pdata += data.toString();
         })



		// when complete POST data is received
		req.on('end', () => {
			pdata = qs.parse(pdata);
			// res.write ("The name is: "+ pdata['the_name']);
            res.write("OK");
			// res.end();
        });
      }
	  else {
		  res.writeHead(200, {'Content-Type':'text/html'});
		  res.write ("Unknown page request");
		  res.end();
	  }
  

}).listen(3000);
