import express from 'express';
import User from '../models/user';
// import PhoneToken from 'map this to ../oAuth/Twilio/phone';
const router = new express.Router();

// router.post('/register_phone/:id', (req, res) => PhoneToken.get(req.params.id, res.handle));
router.post('/register', (req, res) => User.registerNewUser(req.body, req.headers['x-forwarded-for'] || req.connection.remoteAddress, res.handle));

router.get('/verify/:token', (req, res) => User.emailVerified(req.params.token, res.handle));

router.post('/login', (req, res) => User.authenticate(req.body, res.handle));
router.get('/profile', User.authorize(), (req, res) => res.send(req.user));
router.post('/logout', (req, res) => res.clearCookie('accessToken').status(200).send({ SUCCESS: 'You\'ve been successfully logged out.' }));

router.route('/:id')
.get((req, res) =>
User.findById(req.params.id).select({ password: false }).exec(res.handle)
)
.put((req, res) =>
User.findByIdAndUpdate(req.params.id).select({ password: false }).exec(res.handle)
)
.delete((req, res) => User.findByIdAndRemove(req.params.id, res.handle));


/*
TODO: Delete these dev routes before production
START
*/
router.post('/toggle-admin/:id', User.authorize({ Admin: true }), (req, res) => {
  User.findById(req.params.id, (err, dbUser) => {
    if (err) res.send(err);

    dbUser.roles.admin = !dbUser.roles.admin;
    dbUser.save()
    .then(savedUser => res.send(savedUser))
    .catch(error => res.send(error));
  });
});
router.delete('/', (req, res) => User.remove({}, res.handle));
router.get('/', (req, res) => User.find({}, res.handle));
// FINISH

export default router;
