import React from 'react'
import {delay} from '../../common/util'
import './Message.css'

interface MessageOptions {
  message?: string
  duration?: number
  type?: 'success' | 'info' | 'error'
}

let elements: HTMLDivElement[] = []

/**
 * todo: 新增icon标识
 */
export const message = {
  success(message: string, options?: Omit<MessageOptions, 'type'>) {
    return show({...options, message, type: 'success'})
  },
  info(message: string, options?: Omit<MessageOptions, 'type'>) {
    return show({...options, message, type: 'info'})
  },
  error(message: string, options?: Omit<MessageOptions, 'type'>) {
    return show({...options, message, type: 'error'})
  },
  show(options: MessageOptions) {
    return show(options)
  },
  destroy() {
    elements.forEach(hide)
  },
}

function show({duration = 2000, type = 'success', message} = {} as MessageOptions) {
  const div = document.createElement('div')
  div.innerText = message
  div.className = `Message ${type}`

  document.body.appendChild(div)
  elements.push(div)
  delay(100)
    .then(() => {
      div.classList.add('show')
      return delay(duration)
    })
    .then(() => hide(div))
  return () => hide(div)
}

async function hide(div: HTMLDivElement) {
  elements = elements.filter(item => item !== div)
  div.classList.remove('show')
  await delay(500)
  div.remove()
}
