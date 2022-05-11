import React, { useState, useEffect } from 'react';
import Axios from 'axios';



export default function TodolistFunction() {
    let [state, setState] = useState({
        taskList: [],
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
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: "GET"
        })

        promise.then((result) => {
            setState({
                ...state,
                taskList: result.data,
                values: {
                    taskName: ""
                }
            })
        });

        promise.catch((err) => {
            alert(err.response.data.Message)
        })
    }

    let renderTaskToDo = () => {
        return state.taskList.filter(task => !task.status).map((task, index) => {
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
        return state.taskList.filter(task => task.status).map((task, index) => {
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
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {
                taskName: state.values.taskName
            }
        })

        promise.then((result) => {

            getTaskList()
        })

        promise.catch((err) => {
            console.log('err', err);

            alert(err.response.data)
        })
    }

    let delTask = (taskName) => {

        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })

        promise.then((result) => {
            getTaskList()
        })

        promise.catch((err) => {
            alert(err.response.data);
        })
    }

    let doneTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then((result) => {
            getTaskList()
        })

        promise.catch((err) => {
            alert(err.response.data)
        })
    }

    let rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then((result) => {
            getTaskList()
        })

        promise.catch((err) => {
            alert(err.response.data)
        })
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
                        <p>September 9,2020</p>
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
