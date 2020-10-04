import { Workbox } from 'workbox-window';

console.log('start register service worker and push notification.');

export default function regSW() {
  const applicationServerPublicKey = 'BOge5cYtaGoolBmw69Jrai9LIOvJuvcXzSHddFWWU_rCc_2h-Eh-xem6l3ssKQMvr3X_wvAAZekemHV8xixXLT0';
  const pushButton = document.querySelector('.js-push-btn');
  let isSubscribed = false;
  let swRegistration = null;

  function urlB64ToUint8Array(base64String) {
    // eslint-disable-next-line no-mixed-operators
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      // eslint-disable-next-line no-useless-escape
      .replace(/\-/g, '+')
      .replace(/_/g, ' /');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Menginisialisasi Status
  function initialiseUI() {
    pushButton.addEventListener('click', () => {
      pushButton.disabled = true;
      console.log(isSubscribed);
      if (isSubscribed) {
        // TODO: Unsubscribe user
        // eslint-disable-next-line no-alert
        alert('Anda tidak subcribed');
        unsubscribeUser();
      } else {
        subscribeUser();
      }
    });

    // Set the initial subscription value
    // console.log(swRegistration)
    swRegistration.pushManager.getSubscription()
      .then((subscription) => {
        isSubscribed = !(subscription === null);
        if (isSubscribed) {
          console.log('User IS subscribed.');
        } else {
          console.log('User is NOT subscribed.');
        }
        updateBtn();
      });
  }

  function updateBtn() {
    if (Notification.permission === 'denied') {
      pushButton.textContent = 'Notifikasi diBlock.';
      // eslint-disable-next-line no-alert
      alert('Anda block notifikasi');
      pushButton.disabled = true;
      return;
    }
    if (isSubscribed) {
      pushButton.textContent = 'Nonaktifkan Notifikasi';
    } else {
      pushButton.textContent = 'Aktifkan Notifikasi';
    }
    pushButton.disabled = false;
  }

  function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    swRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey,
    })
      .then((subscription) => {
        console.log('User is subscribed:', subscription);
        const data = JSON.stringify(subscription);
        console.log(data);
        isSubscribed = true;
        updateBtn();
      })
      .catch((err) => {
        console.log('Failed to subscribe the user: ', err);
        updateBtn();
      });
  }

  // unscriber user
  function unsubscribeUser() {
    swRegistration.pushManager.getSubscription()
      .then((subscription) => {
        if (subscription) {
          return subscription.unsubscribe();
        }
      })
      .catch((error) => {
        console.log('Error unsubscribing', error);
      })
      .then(() => {
        console.log('User is unsubscribed.');
        isSubscribed = false;
        updateBtn();
      });
  }

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push is supported');
    const workbox = new Workbox('./service-worker.js');
    workbox.register();

    navigator.serviceWorker.register('./service-worker.js')
      .then((swReg) => {
        console.log('Service Worker is registered', swReg);

        swRegistration = swReg;
        initialiseUI();
      })
      .catch((error) => {
        console.error('Service Worker Error', error);
      });
  } else {
    console.warn('Push messaging is not supported');
    pushButton.textContent = 'Push Not Supported';
  }
}
