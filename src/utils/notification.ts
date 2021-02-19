export function getNotificationPermission() {
  if (window.Notification && Notification.permission !== 'granted') {
    Notification.requestPermission(function (status) {
      console.log(status)
      //   if (Notification.permission !== status) {
      //     Notification.permission = status;
      //   }
    })
  }
}

export function notice() {
  if (window.Notification) {
    Notification.requestPermission(function (status) {
      if (status === 'granted') {
        console.log(status)
        const notification = new Notification('Hi there!', {
          body: 'body',
          icon: '/logo192.png',
          requireInteraction: true,
          tag: new Date().getTime().toString(),
          data: {
            num: 100,
          },
        })
        console.log(notification)
        notification.onclick = function (event) {
          // event.preventDefault(); // prevent the browser from focusing the Notification's tab
          console.log(event)
        }
        notification.onclose = function (e) {
          // event.preventDefault(); // prevent the browser from focusing the Notification's tab
          console.log(e)
        }
      } else {
        console.warn(status)
      }
    })
  }
}

export function showNotification(onWork: () => void, onRest: () => void) {
  Notification.requestPermission(function (result) {
    if (result === 'granted') {
      const tag = new Date().getTime().toString()
      navigator.serviceWorker.ready.then(function (registration) {
        console.log('registration', registration)
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '/logo192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag,
          data: {
            onWork,
            onRest,
          },
          actions: [
            {
              action: 'WORK',
              title: 'Work',
            },
            {
              action: 'REST',
              title: 'Rest',
            },
          ],
        })
        registration.getNotifications({ tag }).then((notifications:Notification[]) => {
          console.log(notifications)
        })
      })
    }
  })
}
