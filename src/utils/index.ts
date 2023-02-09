import { message } from 'antd'

function notice(
  title: string,
  status?: 'work' | 'rest',
  option?: NotificationOptions
) {
  const options: NotificationOptions = {
    lang: 'zh',
    icon: '/logo.png',
    image: status === 'rest' ? '/rest.png' : '/work.png',
    vibrate: [200, 100, 200],
    ...option,
  }
  try {
    const notification = new Notification(title, options)
    return notification
  } catch (error) {
    console.error(error)
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.showNotification(title, options)
      })
      .catch((err) => {
        console.error(err)
        message.info(title)
      })
  }
}

export function notify(
  title: string,
  status?: 'work' | 'rest',
  options?: NotificationOptions
) {
  console.log('notify', status, title, options)
  if (!('Notification' in window)) {
    // Check if the browser supports notifications
    alert('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    notice(title, status, options)
    // …
  } else if (Notification.permission !== 'denied') {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        notice(title, status, options)
        // …
      } else {
        message.info(title)
      }
    })
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}

export function requestNotificationPermission() {
  console.log('requestNotificationPermission')
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return Promise.resolve(false)
  } else if (Notification.permission === 'granted') {
    return Promise.resolve(true)
  } else if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        return true
      }
      return false
    })
  }
  return Promise.resolve(false)
}
