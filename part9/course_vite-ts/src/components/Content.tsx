import type { CoursePart } from "../types"
import Part from './Part'

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => {
  return (
    props.courseParts.map(course => (
      <div>
        <h4 key={course.name}>{course.name} {course.exerciseCount}</h4>
        <Part course={course} />
      </div>
    ))
  )
}

export default Content