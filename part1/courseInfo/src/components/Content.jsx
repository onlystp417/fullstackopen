import Part from './Part'

const Content = ({ parts }) => {
  return (
    <>
      <Part part={parts[0].name} exercises={parts[0].exercise} />
      <Part part={parts[1].name} exercises={parts[1].exercise} />
      <Part part={parts[2].name} exercises={parts[2].exercise} />
    </>
  )
}

export default Content