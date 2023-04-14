import { useSelector, useDispatch } from "react-redux";
import { voted } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => 
  {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) => 
      anecdote.content.toLowerCase()
      .includes(state.filter.toLowerCase()))
    } else {
      return state.anecdotes
    }
  });

  const vote = (anecdote) => {
  dispatch(voted(anecdote))
  dispatch(createNotification(`You voted for ${anecdote.content}`));
  };



  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
