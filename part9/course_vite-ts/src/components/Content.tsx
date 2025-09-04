type Course = {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  courseParts: Array<Course>
}

const Content = (props: ContentProps) => {
  return (
    props.courseParts.map(course => (
      <p key={course.name}>{course.name} {course.exerciseCount}</p>
    ))
  )
}

export default Content