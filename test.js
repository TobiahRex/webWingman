import Promise from 'bluebird';

const bcrypt = Promise.promisifyAll(require('bcrypt'));
// bcrypt.hash('tobiahrex', 10, (err, hash) => {
//   console.log('hash: ', hash);
// });

// let bcryptHash = Promise.promisify(bcrypt.hash('TobiahRex'));
// bcrypt.hash(10, 'TobiahRex')
// .then((res) => console.log('res: ', res))
// .catch((err) => console.error('error: ', err));

// .then((res) => {
//   console.log('res: ', res);
//   return bcrypt.hashAsync('TobiahRex', res, null)
// })

// bcrypt.genSaltAsync(10)
// .then((result) => bcrypt.hashAsync('TobiahRex', result))
// .then(hash => console.log('hash: ', hash))
// .catch((err) => console.log('err: ', err));


bcrypt.hashAsync('TobiahRex', 10)
.then(hash => console.log('hash: ', hash))
.catch((err) => console.log('err: ', err));
