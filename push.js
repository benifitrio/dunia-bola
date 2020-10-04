// eslint-disable-next-line import/no-extraneous-dependencies
const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BOge5cYtaGoolBmw69Jrai9LIOvJuvcXzSHddFWWU_rCc_2h-Eh-xem6l3ssKQMvr3X_wvAAZekemHV8xixXLT0',
  privateKey: '2DiBuuaGf8iWO34RYqOnxh92LAPBsBxgsE0Eb-4C12E',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/eM1xQ_e365A:APA91bErlA2hV6RUR6bNueZyjcnzviRc7syQolY6I_pTCrfuanL1x3kwOeh4TCIvxfcw9g9OpSI-_yLxsk2fw-L2eHGkkNpW7_nqlquWSlbdGBiA04UGABuBA-zfL3viBKr0LK6DJWwm', expirationTime: null, keys: { p256dh: 'BM9K8kvSI3D5h2FZTgWYvFuNsbwtWacjiWWiAfweJm4Jl39QhBKXpQ5fRBvWoZ_X5qqCLptrrjb80QHso5XXEsk', auth: 'Psvm5Cb4VsfyhpUC7iDpNQ' },
};

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
  gcmAPIKey: '634719526675',
  TTL: 60,
};

webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
