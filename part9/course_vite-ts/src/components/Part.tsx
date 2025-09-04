import type { CoursePart } from "../types"

interface PartProps {
  course: CoursePart
}

const Part = (props: PartProps) => {
  switch (props.course.kind) {
    case 'basic':
      return (
        <i>{ props.course.description }</i>
      )
    case 'group':
      return (
        <p>Project exercises { props.course.groupProjectCount }</p>
      )
    case 'background':
      return (
        <>
          <i>{ props.course.description }</i>
          <p>submit to { props.course.backgroundMaterial }</p>
        </>
      )
    default:
      return (
        <p>This is a special course. Please contact student help desk to follow more.</p>
      )
  }
}

export default Part