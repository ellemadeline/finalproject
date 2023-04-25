var http = require('http');
var fs = require('fs');
var qs = require('querystring');

http.createServer(function (req, res) 
  {
	  if (req.url == "/track")
	 {
	  console.log("track");

		file = 'track.html';
		fs.readFile(file, 'utf8', function(err, txt) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(txt);
			res.end();
		});

	}

	  else if (req.url == "/view")
		{
		 console.log("view");
		   file = 'view.html';
		   fs.readFile(file, 'utf8', function(err, txt) {
			   res.writeHead(200, {'Content-Type': 'text/html'});
			   res.write(txt);
			   res.end();
		   });
		}

		else if (req.url == "/search")
		{
		 console.log("view");
		   file = 'search.html';
		   fs.readFile(file, 'utf8', function(err, txt) {
			   res.writeHead(200, {'Content-Type': 'text/html'});
			   res.write(txt);
			   res.end();
		   });
		}
	   else 
	  {
		  res.writeHead(200, {'Content-Type':'text/html'});
		  res.write ("Unknown page request");
		  res.end();
	  }
  


}).listen(3000);
