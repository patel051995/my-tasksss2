import {Component} from 'react'
import {v4 as uuidv4} from 'uuid' // Updated import for uuid
import Tag from './components/Tag' // Ensure this component handles tag display
import './App.css'

const tagsList = [
  {optionId: 'HEALTH', displayText: 'Health'},
  {optionId: 'EDUCATION', displayText: 'Education'},
  {optionId: 'ENTERTAINMENT', displayText: 'Entertainment'},
  {optionId: 'SPORTS', displayText: 'Sports'},
  {optionId: 'TRAVEL', displayText: 'Travel'},
  {optionId: 'OTHERS', displayText: 'Others'},
]

class App extends Component {
  state = {
    inputText: '',
    inputTag: tagsList[0].optionId, // Default to the first tag
    taskList: [],
    activeTag: 'INITIAL',
  }

  componentDidMount() {
    const storedTasks = localStorage.getItem('taskList')
    if (storedTasks) {
      this.setState({taskList: JSON.parse(storedTasks)})
    }
  }

  onChangeInputText = event => {
    this.setState({inputText: event.target.value})
  }

  onChangeSelect = event => {
    this.setState({inputTag: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {inputText, inputTag} = this.state

    // Check if inputText is non-empty
    if (inputText.trim()) {
      const newTask = {
        id: uuidv4(),
        task: inputText.trim(),
        tag: inputTag,
      }

      this.setState(prevState => {
        const updatedTaskList = [...prevState.taskList, newTask]
        localStorage.setItem('taskList', JSON.stringify(updatedTaskList))
        return {
          taskList: updatedTaskList,
          inputText: '', // Reset input field after submission
          inputTag: tagsList[0].optionId, // Reset tag selection to default
        }
      })
    }
  }

  onClickActiveTag = id => {
    this.setState(prevState => ({
      activeTag: prevState.activeTag === id ? 'INITIAL' : id,
    }))
  }

  getFilteredTasks = () => {
    const {taskList, activeTag} = this.state
    return activeTag === 'INITIAL'
      ? taskList
      : taskList.filter(task => task.tag === activeTag)
  }

  render() {
    const {inputText, inputTag, activeTag} = this.state
    const filteredTasks = this.getFilteredTasks()

    return (
      <div className="main-container">
        <div className="left-container">
          <div className="left-inner-container">
            <h1 className="heading">Create a task!</h1>
            <form className="form-container" onSubmit={this.submitForm}>
              <label htmlFor="task" className="label">
                Task
              </label>
              <input
                type="text"
                id="task"
                className="input-ele"
                placeholder="Enter the task here"
                value={inputText}
                onChange={this.onChangeInputText}
                required
              />
              <label htmlFor="tags" className="label-tags">
                Tags
              </label>
              <select
                id="tags"
                className="select-ele"
                value={inputTag}
                onChange={this.onChangeSelect}
              >
                {tagsList.map(tag => (
                  <option key={tag.optionId} value={tag.optionId}>
                    {tag.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="add-task">
                Add Task
              </button>
            </form>
          </div>
        </div>
        <div className="right-container">
          <div className="right-inner-container">
            <h1 className="tags-heading">Tags</h1>
            <ul className="tags-list">
              {tagsList.map(tag => (
                <Tag
                  key={tag.optionId}
                  tag={tag}
                  onClickActiveTag={this.onClickActiveTag}
                  isActive={activeTag === tag.optionId}
                />
              ))}
            </ul>
            <h1 className="tags-heading">Tasks</h1>
            {filteredTasks.length === 0 ? (
              <div className="no-task-container">
                {activeTag === 'INITIAL' ? (
                  <p className="no-tasks">No Tasks Added Yet</p>
                ) : (
                  <p className="no-tasks">{`No ${
                    activeTag.charAt(0).toUpperCase() +
                    activeTag.slice(1).toLowerCase()
                  } Tasks Added Yet`}</p>
                )}
              </div>
            ) : (
              <ul className="tasks-list">
                {filteredTasks.map(task => (
                  <li key={task.id}>
                    <p>{task.task}</p> {/* Display task content */}
                    <p>{task.tag}</p> {/* Display task tag */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
