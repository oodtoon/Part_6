import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (NewAnecdote) => {
  axios.post(baseUrl, NewAnecdote).then((res) => res.data);
};

export const addVote = (anecdote) => {
    const id = anecdote.id
    const votes = { content: anecdote.content, votes: anecdote.votes }
    axios.put(`${baseUrl}/${id}`, votes).then(res => res.data)
}