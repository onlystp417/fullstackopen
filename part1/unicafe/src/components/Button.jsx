export default function Button({ setToComment, text }) {
  return (
    <button onClick={() => setToComment(text)}>{ text }</button>
  )
}
