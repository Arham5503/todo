import { createSlice } from "@reduxjs/toolkit";

const savedtasks = JSON.parse(localStorage.getItem("tasks")) || [];

export const AddTask = createSlice({
  name: "NewTask",
  initialState: {
    tasks: savedtasks,
  },
  reducers: {
    addtask: (state, action) => {
      state.tasks.push({
        id: Date.now(),
        task: action.payload,
        completed: false,
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    completeTask: (state, action) => {
      let task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
  },
});

export const { addtask, completeTask, deleteTask } = AddTask.actions;
export default AddTask.reducer;

// //Slice Slice contain antial value and reducer functions in function we have acctions
// import { createSlice } from "@reduxjs/toolkit";

// const savedtasks = JSON.parse(localStorage.getItem("tasks")) || [];
// export const AddTask = createSlice({
//   name: "NewTask",
//   initialState: {
//     tasks: savedtasks,
//   },
//   reducers: {
//     addtask: (state, action) => {
//       state.tasks.push({
//         id: Date.now(),
//         task: action.payload,
//         completed: false,
//       });
//       localStorage.setItem("tasks", JSON.stringify(state.tasks));
//     },

//     // completeTask: (state, action) => {
//     //       let task = state.tasks.find((t) => t.id === action.payload);
//     //       if (task) {
//     //         task.completed = !task.completed; // ✅ fix
//     //       }
//     //       localStorage.setItem("tasks", JSON.stringify(state.tasks));
//     //     },
//     //     deleteTask: (state, action) => {
//     //     state.tasks.filter((t) => t.id !== action.payload); // ✅ fix
//     //       localStorage.setItem("tasks", JSON.stringify(state.tasks));
//     //     },
//     //   },

//     completeTask: (state, action) => {
//       let complete = state.tasks.find((t) => t.id === action.payload);
//       if (complete) {
//         task.complete = !task.complete;
//       }
//       localStorage.setItem("tasks", JSON.stringify(state.tasks));
//     },
//     deleteTask: (state, action) => {
//       state.tasks.filter((t) => t.id !== action.payload);
//       localStorage.setItem("tasks", JSON.stringify(state.tasks));
//     },
//   },
// });
// export const { addtask, completeTask, deleteTask } = AddTask.actions;
// export default AddTask.reducer;
