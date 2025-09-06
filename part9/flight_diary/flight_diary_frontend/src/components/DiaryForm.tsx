import React, { useState } from 'react';
import axios from 'axios'
import { createDiary } from '../services/diaries';
import { Weather, Visibility } from '../types';

interface DiaryFromProps {
  refecth: () => void
}

const DiaryForm = (props: DiaryFromProps) => {
  const [date, setDate] = useState<string>('')
  const [weather, setWeather] = useState<Weather | ''>('')
  const [visibility, setVisibility] = useState<Visibility | ''>('')
  const [comment, setComment] = useState<string>('')

  async function handleSubmit(event: React.SyntheticEvent): Promise<void> {
    event.preventDefault();
    if (!weather || !visibility) {
      alert('Weather and Visibility must select!')
      return
    }
    try {
      await createDiary({
        date,
        weather,
        visibility,
        comment
      })
      resetForm()
      props.refecth()
    } catch(error) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data ?? 'An error occurred');
      } else {
        console.log(error)
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
          <input type="date" id="date" value={weather} onChange={ e => setDate(e.target.value) } />
        </div>
          <label htmlFor="weather">Weather: </label>
          <select
            id="weather"
            name="weather"
            value={weather ?? ''}
            onChange={e => setWeather(e.target.value as Weather)}
          >
            <option value="''">Please Select</option>
            {Object.values(Weather).map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        <div>
          <label htmlFor="visibility">Visibility: </label>
          <select
            name="visibility"
            id="visibility"
            value={visibility ?? ''}
            onChange={e => setVisibility(e.target.value as Visibility)}
          >
            <option value="''">Please Select</option>
            {Object.values(Visibility).map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
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