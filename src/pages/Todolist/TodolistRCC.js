import Axios from 'axios';
import React, { Component } from 'react';
import style from './Todolist.css';

export default class TodolistRCC extends Component {

    state = {
        taskList: [],
        values: {
            taskName: ""
        },
        errors: {
            taskName: ""
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: "GET"
        })

        promise.then((result) => {
            this.setState({
                taskList: result.data,
                values: {
                    taskName: ""
                }
            })
        });
        promise.catch((err) => {
            // console.log("Thất bại", err)
        })
    }

    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" onClick={() => { this.delTask(item.taskName) }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button className="complete" onClick={() => { this.doneTask(item.taskName) }}>
                            <i className="far fa-check-circle" />
                            <i className="fas fa-check-circle" />
                        </button>
                    </div>
                </li>
            )
        })
    }

    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return (
                <li key={index}>
                    <span>{item.taskName}</span>
                    <div className="buttons">
                        <button className="remove" onClick={() => { this.delTask(item.taskName) }}>
                            <i className="fa fa-trash-alt" />
                        </button>
                        <button className="complete" onClick={() => { this.rejectTask(item.taskName) }}>
                            <i className="far fa-undo" />
                            <i className="fas fa-undo" />
                        </button>
                    </div>
                </li>
            )
        })
    }

    handleChangeInput = (event) => {
        let { name, value } = event.target;
        let newValues = { ...this.state.values, [name]: value }
        let newErrors = { ...this.state.errors }

        if (value.trim() === "") {
            newErrors[name] = "Không được để trống"
        } else {
            newErrors[name] = ""

        }

        this.setState({
            ...this.state,
            values: newValues,
            errors: newErrors
        })
    }


    addTask = () => {
        let promise = Axios({
            url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
            method: "POST",
            data: {
                taskName: this.state.values.taskName
            }
        })

        promise.then((result) => {
            console.log("thành công", result);
            this.getTaskList()

        })

        promise.catch((err) => {
            alert(err.response.data);

        })


    }

    delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: "DELETE"
        })

        promise.then((result) => {
            // alert(result.data)
            this.getTaskList()
        })
        promise.catch((err) => {
            alert(err.response.data)
        })
    }

    doneTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: "PUT"
        })

        promise.then((result) => {
            this.getTaskList()
        })

        promise.catch((err) => {
            alert(err.response.data);
        })
    }

    rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: "PUT"
        })

        promise.then((result) => {
            this.getTaskList()
        })

        promise.catch((err) => {
            alert(err.response.data);
        })
    }

    // call API trong lifecycle này
    componentDidMount() {
        this.getTaskList()
    }

    render() {
        return (
            <div >
                <button className='btn btn-success' >Get task list</button>
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
                                <input onChange={this.handleChangeInput} value={this.state.values.taskName} name="taskName" id="newTask" type="text" placeholder="Enter an activity..." />

                                <button onClick={this.addTask} id="addItem">
                                    <i className="fa fa-plus" />
                                </button>
                            </div>
                            <p className='text-danger'>{this.state.errors.taskName}</p>


                            <div className="card__todo">

                                {/* Uncompleted tasks */}
                                <ul className="todo" id="todo">
                                    {this.renderTaskToDo()}
                                </ul>


                                {/* Completed tasks */}
                                <ul className="todo" id="completed">
                                    {this.renderTaskToDoDone()}
                                </ul>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
