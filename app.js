const http = require('http');

const server = http.createServer();

server.on('request', (request, response) => {
  if (request.method === 'POST' && request.url === '/time_tracking') {
    let data = '';
    let count = 0;

    request.on('data', (chunk) => {
      data += chunk;
      count++;
    });

    request.on('end', () => {
      if (data) {
        response.setHeader('Content-Type', 'application/json');
        response.write(data);
        response.end();
      } else {
        response.statusCode = 400;
        response.statusMessage = 'Request missing data';
        response.setHeader('Content-Type', 'text/plain');
        response.write('Request missing data');
        console.log('no data');
        response.end();
      }
    });
  } else {
    response.statusCode = 404;
    response.statusMessage = 'SERVER ON REQUEST: not found';
    response.setHeader('Content-Type', 'text/plain');
    response.write('SERVER ON REQUEST: Method not allowed / path not found');
    console.log('SERVER ON REQUEST: Method not allowed / path not found');
    response.end();
  }

  request.on('error', (err) => {
    console.error(`Из request on 'error': ${err}`);
  });
});

server
  .listen(8080, (error) => {
    if (error) {
      // Не срабатывает при запуске второго процесса на том же порту, почему - пока непонятно
      console.log(`Из колбека listen: ${error}`);
    } else {
      console.log('Сервер запущен');
    }
  })
  .on('error', (error) => console.log(`Из server listen on: ${error}`));
