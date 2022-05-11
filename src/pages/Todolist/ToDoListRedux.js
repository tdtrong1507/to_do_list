import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskApi, delTaskApi, doneTaskApi, getTaskListApi, rejectTaskApi } from '../../redux/actions/ToDoListAction'
import { GET_TASK_API } from '../../redux/constants/ToDoListConstants'

export default function ToDoListRedux() {
    const { taskList } = useSelector(state => state.ToDoListReducer)
    const dispatch = useDispatch()


    let [state, setState] = useState({
        values: {
            taskName: ""
        },
        errors: {
            taskName: ""
        }
    })

    useEffect(() => {
        getTaskList()


    }, [])


    let getTaskList = () => {
        dispatch(getTaskListApi())
    }

    let renderTaskToDo = () => {
        return taskList.filter(task => !task.status).map((task, index) => {
            return (
                <li key={index}>
                    <span>{task.taskName}</span>
                    <div className="buttons">
                        <button onClick={() => { delTask(task.taskName) }} className="remove">
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button onClick={() => { doneTask(task.taskName) }} className="complete">
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                        </button>
                    </div>
                </li>
            )
        })
    }

    let renderTaskToDoDone = () => {
        return taskList.filter(task => task.status).map((task, index) => {
            return (
                <li key={index}>
                    <span>{task.taskName}</span>
                    <div className="buttons">
                        <button onClick={() => { delTask(task.taskName) }} className="remove">
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button onClick={() => { rejectTask(task.taskName) }} className="complete">
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                        </button>
                    </div>
                </li>
            )
        })
    }

    let handleChangeInput = (event) => {
        let { name, value } = event.target
        let newValues = { ...state.values, [name]: value }
        let newErrors = { ...state.errors }

        if (value.trim() === "") {
            newErrors.taskName = "Không được để trống !!!"
        } else {
            newErrors.taskName = ""

        }

        setState({
            ...state,
            values: newValues,
            errors: newErrors
        })
    }

    let addTask = () => {
        if (state.values.taskName === "") {
            alert("Vui Lòng Nhập Tên Task!!!")
        } else {
            dispatch(addTaskApi(state.values.taskName));
            setState({
                ...state,
                values: {
                    taskName: ""
                }
            })

        }
    }

    let delTask = (taskName) => {
        dispatch(delTaskApi(taskName))
    }

    let doneTask = (taskName) => {
        dispatch(doneTaskApi(taskName))
    }

    let rejectTask = (taskName) => {
        dispatch(rejectTaskApi(taskName))

    }



    return (
        <div className="card">
            <div className="card__header">
                <img src={require('./bg.png')} alt="bg.png" />

            </div>
            {/* <h2>hello!</h2> */}
            <div className="card__body">
                <div className="card__content">
                    <div className="card__title">
                        <h2>My Tasks</h2>
                        <p>May 9,2022</p>
                    </div>
                    <div className="card__add">
                        <input id="newTask" name='taskName' onChange={handleChangeInput} value={state.values.taskName} type="text" placeholder="Enter an activity..." />
                        <button id="addItem" onClick={addTask}>
                            <i className="fa fa-plus" />
                        </button>
                    </div>
                    <p className='text-danger'>{state.errors.taskName}</p>
                    <div className="card__todo">

                        {/* Uncompleted tasks */}
                        <ul className="todo" id="todo">
                            {renderTaskToDo()}
                        </ul>

                        {/* Completed tasks */}
                        <ul className="todo" id="completed">
                            {renderTaskToDoDone()}
                        </ul>


                    </div>
                </div>
            </div>
        </div>

    )
}
