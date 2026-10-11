const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');


//create the server and handle incoming requests
const server = http.createServer(function(req, res) {

//gets the requested URL path and the query parameters
const page = url.parse(req.url).pathname;
const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  //path to the main HTML page / homepage
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if('generate' in params) {
    //convert the JSON string from the HTML into an object
    const answers = JSON.parse(params.generate);
    //stores name option for each question category
    const names = {
      personality: { 
        creative: 'Cypher', 
        funny: 'Verse', 
        adaptable: 'Shadow'
      }, 
      animal: { 
        lion: 'Iron',
        owl: 'Oracle', 
        shark: 'Major'
      }, 
      element: { 
        air: 'Wind', 
        water: 'Flow',
        earth: 'World',
        fire: 'Blaze'
      }, 
      season: { 
        fall: 'Autumn', 
        winter: 'Frost', 
        spring: 'Blade',
        summer: 'Solar'
      }, 
      time: { 
        morning: 'Dawn', 
        afternoon: 'Phantom', 
        night: 'Midnight'
      }
   }; 
      //look up the name options and store them in an array
      const nameOptions = [
        names.personality[answers.personality], 
        names.animal[answers.animal], 
        names.element[answers.element], 
        names.season[answers.season], 
        names.time[answers.time]
      ];

      if (nameOptions.includes(undefined)) { 
        res.writeHead(400, { 'Content-Type': 'application/json'}); 
        res.end(JSON.stringify({error: 'Invalid answers to survey'}));
      }
      else { 

        const numberOfNames = Math.floor(Math.random() * 2) + 2; 

        //use sort() to shuffle up the name options to get random names
        nameOptions.sort(function() { 
          return Math.random() - 0.5;
        }); 

        //select 2 or 3 name options and combines them - use join() to combine them with a sapce
        const generatedName = nameOptions.slice(0, numberOfNames).join(' ');   

        //response - generated name with randomly generated options
        const objToJson = { 
          name: generatedName
        };
      

        //send the generated name back to the HTML
        res.writeHead(200, {'Content-Type': 'application/json'}); 
        res.end(JSON.stringify(objToJson));
      }
    }
      else { //if answers are not provided 
      res.writeHead(400, { 'Content-Type': 'application/json'}); 
      res.end(JSON.stringify({error: 'Survey answers are required'}));
      }
  }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else{
    res.writeHead(404, { 'Content-Type': 'text/plain'});
    res.end('404 - Page not found');
  }
});

//starts the serve on port 8000
server.listen(8000);
  console.log('Server is running at http://localhost:8000');