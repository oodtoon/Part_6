import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useNotificationDispatch } from "../NotificationContext";

const AnecdoteForm = () => {
  const messageDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          if (content.length > 5) {
            messageDispatch({
              type: "CREATE",
              data: `anecdote "${content}" created`,
            });
            setTimeout(() => {
              messageDispatch({ type: "NONE" });
            }, 5000);
          } else {
            messageDispatch({
              type: "ERROR",
              data: "too short anecdote, must have length 5 or more",
            });
            setTimeout(() => {
              messageDispatch({ type: "NONE" });
            }, 5000);
          }
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
