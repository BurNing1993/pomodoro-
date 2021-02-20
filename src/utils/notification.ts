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

export function notice(title: string, body: string) {
  if (window.Notification) {
    Notification.requestPermission(function (status) {
      if (status === 'granted') {
        new Notification(title, {
          body,
          icon: '/logo192.png',
          silent: true,
        })
        // notification.onclick = function (event) {
        //   event.preventDefault(); // prevent the browser from focusing the Notification's tab
        //   console.log(event)
        // }
        // notification.onclose = function (event) {
        //   event.preventDefault(); // prevent the browser from focusing the Notification's tab
        //   console.log(event)
        // }
      } else {
        console.warn(status)
      }
    })
  }
}

export function showNotification() {
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
            tag,
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
        registration
          .getNotifications({ tag })
          .then((notifications: Notification[]) => {
            console.log(notifications)
          })
      })
    }
  })
}
