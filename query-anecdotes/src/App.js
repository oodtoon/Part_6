import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAnecdotes, addVote } from "./requests";
import { useReducer } from 'react'

const voteNotificationReducer = (state, action) => {
  if (action) {
    state = `anecdote "${action}" voted `
  } else {
    state = null
  }
  return state
  }


const App = () => {
  const [message, messageDispatch] = useReducer(voteNotificationReducer, null)

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation(addVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  }) 

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1 })
    messageDispatch(anecdote.content)
    setTimeout(() => {
      messageDispatch(null)
    }, 5000)
  };

  const result = useQuery('anecdotes', getAnecdotes)

  if (result.isLoading ) {
    return <div>anecdote service note available due to problems in server</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={message}/>
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
