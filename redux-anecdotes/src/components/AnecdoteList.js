import { useSelector, useDispatch } from "react-redux";
import { voted } from "../reducers/anecdoteReducer";

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

  const vote = (id) => {
  dispatch(voted(id));
  };



  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
