import { useState } from 'react'
import { makeId } from '../services/util.service.js'

export function Chat() {
  const [msgs, setMsgs] = useState([])
  const [newMsg, setNewMsg] = useState({ txt: '' })

  function handleInput({ target }) {
    let { value } = target
    setNewMsg({ txt: value })
  }

  function handleOnSend() {
    if (!newMsg.txt) return
    const msgToAdd = {
      _id: makeId(),
      txt: newMsg.txt,
      from: 'user',
    }

    setMsgs((prevMsgs) => [...prevMsgs, msgToAdd])
    setNewMsg({ txt: '' })
    setSystemMsg()
  }

  function setSystemMsg() {
    const msgToAdd = {
      _id: makeId(),
      txt: 'Sure thing honey',
      from: 'system',
    }
    setTimeout(() => {
      setMsgs((prevMsgs) => [...prevMsgs, msgToAdd])
    }, 600)
  }

  return (
    <div className="chat-container">
      <section className="chat-msgs">
        {msgs.map((msg) => (
          <p
            key={msg._id}
            className={
              msg.from === 'user' ? 'chat-msg-from-user' : 'chat-msg-from-them'
            }
          >
            {msg.txt}
          </p>
        ))}
      </section>
      <input
        placeholder="Messege"
        type="text"
        value={newMsg.txt}
        onInput={handleInput}
      />
      <button
        onClick={() => {
          handleOnSend()
        }}
      >
        SEND
      </button>
    </div>
  )
}
