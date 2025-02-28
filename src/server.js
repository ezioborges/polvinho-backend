import app from "./app.js";

app.listen(process.env.PORT || 3333, () => {
  console.log('\n\nBack-end Online on ' + 'http://localhost:' + process.env.PORT || '3333' + '🚀🚀🚀');
});