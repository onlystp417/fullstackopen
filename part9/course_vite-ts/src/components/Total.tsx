interface TotalProps {
  totalExercises: number
}

const Total = (props: TotalProps) => {
  return (
    <p>Number of { props.totalExercises } exercises.</p>
  )
}

export default Total