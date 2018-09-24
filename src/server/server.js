const { server } = require(path.resolve(__dirname, 'config'));
const app = require('./app');

const PORT = server.port;

app.listen(PORT, () => {
  app.listen(PORT, () => console.log('Suggestions server listening on ' + PORT));
});