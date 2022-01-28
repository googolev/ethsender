
import { Notification } from '../interfaces/Notification'

const BG_COLOR = {
  warn: 'bg-orange-200',
  success: 'bg-green-200',
  error: 'bg-red-200'
}

export const createNotification = async ({ message, type }: Notification):Promise<void> => {
  const container = document.createElement('div')
  container.style.width = 'fit-content'
  container.classList.add('notification', BG_COLOR[type], 'fixed', 'top-4', 'left-0', 'right-0', 'mx-auto', 'flex', 'items-center', 'justify-between', 'p-4', 'rounded-md')

  const rawHTML =
      `<div>
        <b>${type}:</b> ${message}
      </div>`
  container.innerHTML = rawHTML
  document.body.appendChild(container)

  setTimeout(() => {
    container.remove()
  }, 5000)
}
