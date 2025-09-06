import React, { useState } from 'react';
import { createDiary } from '../services/diaries';

const DiaryForm = () => {
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<string>('')
  const [visibility, setVisibility] = useState<string>('')
  const [comment, setComment] = useState<string>('')

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    try {
      const newDiary = await createDiary({
        date,
        weather,
        visibility,
        comment
      })
      console.log(newDiary)
      resetForm()
    } catch(error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log('An unknown error occurred');
      }
    }
  }

  function resetForm() {
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <>
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date: </label>
          <input type="text" name="date" id="date" value={date} onChange={ e => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="waether">Weather: </label>
          <input type="text" name="waether" id="waether" value={weather} onChange={ e => setWeather(e.target.value)} />
        </div>
        <div>
          <label htmlFor="visibility">Visibility: </label>
          <input type="text" name="visibility" id="visibility" value={visibility} onChange={ e => setVisibility(e.target.value)} />
        </div>
        <div>
          <label htmlFor="comment">Comment: </label>
          <input type="text" name="comment" id="comment" value={comment} onChange={ e => setComment(e.target.value)} />
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  )
}

export default DiaryForm