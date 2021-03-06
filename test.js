import Promise from 'bluebird';
import moment from 'moment';

// const bcrypt = Promise.promisifyAll(require('bcrypt'));
// // bcrypt.hash('tobiahrex', 10, (err, hash) => {
// //   console.log('hash: ', hash);
// // });
//
// // let bcryptHash = Promise.promisify(bcrypt.hash('TobiahRex'));
// // bcrypt.hash(10, 'TobiahRex')
// // .then((res) => console.log('res: ', res))
// // .catch((err) => console.error('error: ', err));
//
// // .then((res) => {
// //   console.log('res: ', res);
// //   return bcrypt.hashAsync('TobiahRex', res, null)
// // })
//
// // bcrypt.genSaltAsync(10)
// // .then((result) => bcrypt.hashAsync('TobiahRex', result))
// // .then(hash => console.log('hash: ', hash))
// // .catch((err) => console.log('err: ', err));
//
// bcrypt.hashAsync('TobiahRex', 10)
// .then(hash => bcrypt.compareAsync('TobiahRex', hash))
// .then(result => console.log('result: ', result))
// .catch(err => console.log('err: ', err));


const JWT = Promise.promisifyAll(require('json-web-token'));
//
//
// let token;
//
// JWT.encodeAsync('this is a test secret', { id: 123 })
// .then(res => JWT.decodeAsync('this is a test secret', res))
// .then(res => console.log('DECODE res: ', res))
// .catch(err => console.log('err: ', err));

function testProfileLink() {
  const expiration = moment().add(1, 'w').unix();
  const payload = {
    expiration,
    _id: 'asdfasdfasdfasdf',
  };
  return JWT.encodeAsync('this is a test secret', payload);
}

testProfileLink()
.then(token => {
  console.log('token: ', token);
  `http://localhost:3000/api/users/verify/${token}`
})
.catch(() => console.log('JWT encode threw Error.'));
