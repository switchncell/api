'use-strict';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import router from './routes/index';
import util from 'util';
import passport from 'passport';
import api from './routes/api';

const promisify = util.promisify
const PORT = 3001;
const app = express();

app.use(passport.initialize());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router)
app.use('/api', api);


// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: myGraphQLSchema }));
// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql',
// }));

app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(PORT, () => {
  console.log(`app is listening at ${PORT}`);
});
