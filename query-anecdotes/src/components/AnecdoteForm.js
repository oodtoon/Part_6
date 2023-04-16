import { useReducer } from "react"
import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../requests"
import Notification from "./Notification"


const newAnecdoteNotificationReducer = (state, action) => {
  if (action && action.length > 5) {
    state = `anecdote "${action}" created`
  } else if (action && action.length < 5) {
    state = "too short anecdote, must have length 5 or more"
  } else {
    state = null
  }
  console.log(state)
  return state

}

const AnecdoteForm = () => {
  const [message, messageDispatch] = useReducer(newAnecdoteNotificationReducer, null)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    
      newAnecdoteMutation.mutate({ content, votes: 0 })
      messageDispatch(content)
      setTimeout(() => {
        messageDispatch(null)
      }, 5000)
    
    
}


  return (
    <div>
      <Notification message={message}/>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
