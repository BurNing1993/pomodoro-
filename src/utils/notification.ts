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
      console.log(status)
      if (status === 'granted') {
        const notification = new Notification('Hi there!', {
          badge: '100',
          body: `<div style='color:red'>body</div>`,
          icon: '../assets/logo192.png',
          image: '../assets/logo192.png',
          silent: true,
          actions: [
            {
              action: 'action1',
              title: 'title1',
            },
            {
              action: 'action2',
              title: 'title1',
            },
          ],
        })
        notification.onclick = function (event) {
          // event.preventDefault(); // prevent the browser from focusing the Notification's tab
          console.log(event)
        }
        console.log('notice')
      } else {
        console.warn(status)
      }
    })
  }
}

export function showNotification() {
  Notification.requestPermission(function (result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../assets/logo192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample',
          actions: [
            {
              action: 'action1',
              title: 'title1',
            },
            {
              action: 'action2',
              title: 'title1',
            },
          ],
        })
      })
    }
  })
}
