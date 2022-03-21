import type { Round } from '../types'
import { ROUND_CONFIG } from '../utils/constants'

export function notice(currentRound: Round) {
  const { noticeTitle, body } = ROUND_CONFIG[currentRound]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const notification = new Notification(noticeTitle, {
    body,
    // TODO
    // icon,
  })
  // notification.onclick = function (e) {
  //   console.log(e, 'onclick')
  // }
  // notification.onshow = function (e) {
  //   console.error(e, 'onshow')
  // }
  // notification.onerror = function (e) {
  //   console.log(e, 'onerror')
  // }
  // notification.onclose = function (e) {
  //   console.log(e, 'onclose')
  // }
}
