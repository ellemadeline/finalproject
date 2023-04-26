var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 3000;

http.createServer(function (req, res) 
  {
	if (req.url == "/track.html")
	 {
	  console.log("track");

		file = 'track.html';
		fs.readFile(file, 'utf8', function(err, txt) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(txt);
			res.end();
		});

		}

	  else if (req.url == "/view.html") {
    console.log("view");
    file = 'view.html';
    if (req.method == 'GET') {
        res.writeHead(302, {'Location': '/exercise'});
        res.end();
    } else {
        fs.readFile(file, 'utf8', function(err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
        });
    }
}

	 else if (req.url == "/index.html")
		{
	
		   file = 'index.html';
		   fs.readFile(file, 'utf8', function(err, txt) {
			   res.writeHead(200, {'Content-Type': 'text/html'});
			   res.write(txt);
			   res.end();
		   });
		}
		else if (req.url == "/search.html")
		{
		 console.log("search");
		   file = 'search.html';
		   fs.readFile(file, 'utf8', function(err, txt) {
			   res.writeHead(200, {'Content-Type': 'text/html'});
			   res.write(txt);
			   res.end();
		   });
		}
		else if (req.url == "/register.html")
		{
		   file = 'register.html';
		   fs.readFile(file, 'utf8', function(err, txt) {
			   res.writeHead(200, {'Content-Type': 'text/html'});
			   res.write(txt);
			   res.end();
		   });
		}
		else if (req.url == "/login.html")
		{
		   file = 'login.html';
		   fs.readFile(file, 'utf8', function(err, txt) {
			   res.writeHead(200, {'Content-Type': 'text/html'});
			   res.write(txt);
			   res.end();
		   });
		}
// 		else if (req.url == "/exercise") {
// 			file = 'view.html';
// 			fs.readFile(file, 'utf8', function(err, txt) {
// 			   res.writeHead(200, {'Content-Type': 'text/html'});
// 			   res.write(txt);
// 			   res.end();
// 			});
// 		}
// 		else if (req.url.includes('/exercise'))
// 		{
		   
// 		}
// 		else if (req.url == "/edit.html")
// 		{
// 		   file = 'edit.html';
// 		   fs.readFile(file, 'utf8', function(err, txt) {
// 			   res.writeHead(200, {'Content-Type': 'text/html'});
// 			   res.write(txt);
// 			   res.end();
// 		   });
// 		}
		else if (req.url == "/style.css")
		{
		   file = 'style.css';
		   fs.readFile(file, 'utf8', function(err, txt) {
			   res.writeHead(200, {'Content-Type': 'text/css'});
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
  


		// pdata = "";
		// req.on('data', data => {
		// 	pdata += data.toString();
		// })
		// console.log(pdata);
		// console.log("after pdata");


		// when complete POST data is received
		// req.on('end', () => {
		// 	pdata = qs.parse(pdata);
		// 	res.write ("The name is: "+ pdata['the_name']);
        //     res.write("OK");
		// 	console.log("end of end");
		// 	res.end();
        // });
    //   }
	//   else {
	// 	  res.writeHead(200, {'Content-Type':'text/html'});
	// 	  res.write ("Unknown page request");
	// 	  res.end();
	//   }
  

}).listen(port);
