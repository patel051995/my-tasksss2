import './App.css'
import {Component} from 'react'
import {v4} from 'uuid'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isTrue: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isTrue: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isTrue: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isTrue: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isTrue: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isTrue: false,
  },
]

// Replace your code here
const EachTask = props => {
  const {details} = props
  const {task, tag} = details
  const findItem = tagsList.find(item => item.optionId === tag)
  return (
    <li className="task-list-item">
      <p className="task-para">{task}</p>
      <p className="tag-para">{findItem.displayText}</p>
    </li>
  )
}

const TagItem = props => {
  const {details, onClickTagButton} = props
  const {displayText, optionId, isTrue} = details
  const buttonClass = isTrue ? 'bg-button' : 'tag-button'
  const onClickTag = () => {
    onClickTagButton(optionId)
  }
  return (
    <li>
      <button
        type="button"
        className={buttonClass}
        onClick={onClickTag}
      ></button>
    </li>
  )
}

class App extends Component {
  state = {
    task: '',
    tag: tagList[0].optionId,
    list: [],
    selectTag: '',
    newList: tagsList,
  }

  onChangeSelect = event => {
    this.setState({tag: event.target.value})
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onClickTagButton = button => {
    const {newList} = this.state
    const findItem = newList.find(item => item.optionId === button)
    if (findItem.isTrue === false) {
      const filteredList = newList.map(item => {
        if (item.optionId === button) {
          return {...item, isTrue: true}
        }
        return {...item, isTrue: false}
      })
      console.log(filteredList)
      this.setState({newList: filteredList, selectTag: button})
    }
    if (findItem.isTrue === true) {
      const filteredList = newList.map(item => {
        if (item.optionId === button) {
          return {...item, isTrue: false}
        }
        return item
      })
      console.log(filteredList)
      this.setState({newList: filteredList, selectTag: ''})
    }
  }

  onSubmitTask = event => {
    event.preventDefault()
    const {task, tag} = this.state
    if (task === '') {
      // eslint-disable-next-line no-alert
      alert('Enter the task')
    } else {
      const taskValue = {
        id: v4(),
        task,
        tag,
      }
      this.setState(prevState => ({
        list: [...prevState.list, taskValue],
        task: '',
        tag: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {tag, list, selectTag, task, newList} = this.state
    const filteredList = list.filter((item = item.tag.includes(SelectTag)))
    console.log(selectTag)
    return (
      <div className="bg-container">
        <from className="from-container" onSubmit={this.onSubmitTask}>
          <h1 className="heading">Create a task!</h1>
          <div className="input-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              placeholder="Enter the task here"
              id="task"
              className="input"
              value={task}
              onChange={this.onChangeTask}
            />
          </div>
          <div className="input-container">
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              id="tags"
              className="input"
              value={tag}
              onChange={this.onChangeSelect}
            >
              {tagsList.map(item => (
                <option value={item.optionId} key={item.optionId}>
                  {item.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-button">
            Add Task
          </button>
        </from>
        <div className="container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="ul-container">
            {newList.map(item => (
              <TagItem
                key={item.optionId}
                details={item}
                onClickTagButton={this.onClickTagButton}
              />
            ))}
          </ul>
          <h1 className="tags-heading">Tasks</h1>
          <ul className="task-container">
            {filteredList.length === 0 ? (
              <div className="no-tasks-para">
                <p className="no-tasks-para">No Task Added Yet</p>
              </div>
            ) : (
              filteredList.map(item => (
                <EachTask key={item.optionId} details={item} />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
