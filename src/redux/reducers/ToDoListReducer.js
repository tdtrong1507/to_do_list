import { GET_TASK_API } from "../constants/ToDoListConstants";



const initialState = {
    taskList: [

    ],
    values: {
        taskName: ""
    },
    errors: {
        taskName: ""
    }
}

const ToDoListReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TASK_API: {
            console.log(action)
            state.taskList = action.data
            return { ...state }
        }
            break;


        default:
            return { ...state }
            break;
    }
}

export default ToDoListReducer