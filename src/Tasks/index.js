import {TaskName, TagCategoty, ListItem} from './style'

const Tasks = props => {
  const {taskDetails} = props
  const {taskName, taksCategory} = taskDetails

  return (
    <ListItem>
      <TaskName>{taskName}</TaskName>
      <TagCategoty>{taksCategory}</TagCategoty>
    </ListItem>
  )
}

export default Tasks
