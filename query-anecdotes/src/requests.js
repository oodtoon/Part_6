import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (NewAnecdote) => {
  const content = NewAnecdote.content;
  axios
    .post(baseUrl, NewAnecdote)
    .then((res) => {
      if (content.length < 5) {
        res
          .status(400)
          .send({ error: "too short anecdote, must have length 5 or more" });
      } else {
        return res.data;
      }
    })
    .catch((error) => {
      console.log("error", error)
    });
};

export const addVote = (anecdote) => {
  const id = anecdote.id;
  const votes = { content: anecdote.content, votes: anecdote.votes };
  axios.put(`${baseUrl}/${id}`, votes).then((res) => res.data);
};
