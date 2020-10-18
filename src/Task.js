import React from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core'
import {
  Edit as EditIcon,
  Clear as ClearIcon,
  Check as CheckIcon
} from '@material-ui/icons';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper'


const Task = withStyles({
  root: {
    display: 'flex',
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    alignItems: 'center'
  }
})(({ classes, ...props }) => {
  const [oldMessage, setOldMessage] = React.useState(props.message)
  const [message, setMessage] = React.useState(props.message);
  const [completed, setCompleted] = React.useState(props.completed);
  const [edit, setEdit] = React.useState();

  const toggleCompleted = () => {
    const errors = handleChange({ completed: !completed })
    if(errors){
      return
    }

    setCompleted(!completed)
  }

  const toggleEdit = () => {
    if(edit){
      setMessage(oldMessage)
    }

    setEdit(!edit)
  }

  const handleMessageChange = message => {
    const errors = handleChange({ message })
    if(errors){
      return
    }

    setMessage(message)
    setOldMessage(message)
    setEdit()
  }

  const handleChange = task => props.onChange(
    oldMessage,
    task
  )

  return (
    <Box component={Paper} elevation={3} className={classes.root}>
      <Checkbox checked={completed} onClick={toggleCompleted}/>
      <Text edit={edit} onChange={handleMessageChange} completed={completed} value={message} />
      <Typography>{props.created_on}</Typography>
      <EditAction edit={edit} onClick={toggleEdit} />
    </Box>
  )
})

const Checkbox = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    border: "1px solid rgba(0,0,0,0.3)",
    cursor: 'pointer',
    color: 'white'
  },
  checked: {
    backgroundColor: '#25b025',
    borderColor: 'transparent'
  }
})(({ classes, checked, ...props }) => (
  <div {...props} className={clsx(classes.root, checked && classes.checked)}>
    <CheckIcon />
  </div>
))

const Text = withStyles({
  root: {
    margin: '0 1rem',
    flexGrow: '1'
  }
})(({ classes, value, edit, onChange, completed}) => {
  const [text, setText] = React.useState(value);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13){ 
      onChange(text)
    }
  }

  React.useEffect(() => {
    setText(value)
  }, [value, edit])

  if(edit){
    return (
      <TextField
        label="Task Description"
        className={classes.root}
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
    )
  }

  return (
    <Typography className={classes.root} style={{ textDecoration: completed ? 'line-through' : 'unset'}}>{text}</Typography>
  )
})

const EditAction = withStyles({
  root: {
    fontSize: '1.5rem',
    marginLeft: '1rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)'
    }
  },
  clear: {
    color: 'red'
  }
})(({ classes, edit, ...props }) => (
  <Icon {...props} className={clsx(classes.root, edit && classes.clear)} component={edit ? ClearIcon : EditIcon}/>
))

Task.propTypes = {
  message: PropTypes.string.isRequired,
  created_on: PropTypes.string.isRequired,
  completed: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

Task.defaultProps = {
  completed: false
}

Checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
}

Text.propTypes = {
  edit: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired
}

EditAction.propTypes = {
  edit: PropTypes.bool,
  onClick: PropTypes.func.isRequired
}

export default Task
