import Axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConstants";


//Action có 2 loại
// + Action 1: là action thực thi ngay làm thay đổi reducer
// + Action 2: là action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action)

export const getTaskListApi = () => {

    return (dispatch) => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: "GET"
        });

        promise.then((result) => {
            dispatch({
                type: GET_TASK_API,
                data: result.data
            })
        });

        promise.catch((err) => {
            alert(err.response.data.Message)
        });
    }
}

export const addTaskApi = (taskName) => {

    return (dispatch) => {

        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: {
                taskName: taskName
            }
        })

        promise.then((result) => {

            dispatch(getTaskListApi())
        })

        promise.catch((err) => {
            console.log('err', err);

            alert(err.response.data)
        })
    }
}

export const delTaskApi = (taskName) => {

    return (dispatch) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })

        promise.then((result) => {
            dispatch(getTaskListApi())
        })

        promise.catch((err) => {
            alert(err.response.data);
        })
    }
}

export const doneTaskApi = (taskName) => {
    return (dispatch) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then((result) => {
            dispatch(getTaskListApi())
        })

        promise.catch((err) => {
            alert(err.response.data)
        })
    }
}

export const rejectTaskApi = (taskName) => {

    return (dispatch) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })

        promise.then((result) => {
            dispatch(getTaskListApi())
        })

        promise.catch((err) => {
            alert(err.response.data)
        })
    }

}