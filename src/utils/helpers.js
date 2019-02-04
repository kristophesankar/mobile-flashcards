import { Notifications, Permissions } from 'expo'
import { AsyncStorage } from 'react-native'

//return scurrent date
export function timeToString () {
  return Date.now()
}

//notification key async storage
const NOTIFICATION_STORAGE_KEY = 'MobileFlashcards:notifications'

//reminder message
export function dailyReminderMessage () {
  return {
    message: "Don't forget to complete a quiz today!"
  }
}

//returns time in string
export function getTimeToString () {
  const dateTime = new Date(Date.now())
  const todayDateTime = new Date(Date.UTC(
    dateTime.getFullYear(),
    dateTime.getMonth(),
    dateTime.getDate())
  )
  return todayDateTime.toISOString().split('T')[0]
}

//removes notification from async storage
export function removeNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

//creates a new notification
function createNewNotification () {
  return {
    title: 'Complete Daily Quiz',
    body: "Dont forget to complete a quiz!",
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

//sets a local notification
export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(12)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNewNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, JSON.stringify(true))
            }
          })
      }
    })
}