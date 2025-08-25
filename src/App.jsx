import search from "./assets/search.svg";
import moon from "./assets/moon.svg";
import add from "./assets/add.svg";
import del from "./assets/delete.svg";
import "./App.css";
import { ThemeContext } from "./themeContext/Theme";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addtask, completeTask, deleteTask } from "./AddTask";

function App() {
  // ThemeToggle
  const { theme, toggle } = useContext(ThemeContext);
  // Block Hidding
  const [block, setBlock] = useState(false);
  const [note, setNote] = useState("");
  function addHandler() {
    setBlock((pro) => (pro == false ? true : false));
  }
  // Redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state.NewTask.tasks);
  function Apply() {
    if (note) {
      dispatch(addtask(note));
      setNote("");
    }
  }

  // 🔎 NEW: Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // 🔎 Filtered + Searched tasks
  const filteredData = data.filter((task) => {
    const matchesSearch = task.task
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesFilter =
      filter === "All"
        ? true
        : filter === "Completed"
        ? task.completed
        : !task.completed;

    return matchesSearch && matchesFilter;
  });
  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("bg-white", "text-black");
      document
        .querySelectorAll(".edit")
        .forEach((el) => el.classList.remove("invert"));
      document.body.classList.remove("bg-[#252525]", "text-white");
    } else {
      document.body.classList.add("bg-[#252525]", "text-white");
      document
        .querySelectorAll(".edit")
        .forEach((el) => el.classList.add("invert"));
      document.body.classList.remove("bg-white", "text-black");
    }
  }, [data, theme, filteredData]);

  return (
    <main>
      <div
        className={
          block === true
            ? "block w-[100%] h-[95%] shadow-2xl absolute blur-3xl z-10"
            : "hidden"
        }
      ></div>
      <section className="flex  flex-col gap-4 items-center w-4/5 mx-auto mt-7">
        <h1 className="text-5xl font-medium">Todo List</h1>
        <div className="w-full flex justify-center gap-5">
          <span className="relative inline-block">
            <input
              className="w-[35rem] border-2 border-[#6C63FF]
               focus:outline-none rounded-md px-2 py-1.5 "
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search note..."
            />
            <button
              className="absolute top-0 right-0 h-full px-4
             rounded-r-md bg-[#6C63FF] text-white cursor-pointer"
            >
              <img className="w-7 invert-100" src={search} alt="" />
            </button>
          </span>
          <select
            className="bg-[#6C63FF] text-white rounded-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option className="text-[#6C63FF] bg-white" value="All">
              All
            </option>
            <option className="text-[#6C63FF] bg-white" value="Completed">
              Completed
            </option>
            <option className="text-[#6C63FF] bg-white" value="Uncomplete">
              Uncomplete
            </option>
          </select>
          <button
            className="bg-[#6C63FF] rounded-sm cursor-pointer"
            onClick={toggle}
          >
            <img className="w-9 invert-100" src={moon} alt="" />
          </button>
        </div>

        {/* tasks section start here */}
        <div className="relative w-full flex flex-col items-center p-5 h-[75vh]">
          <div
            className={
              block === true
                ? "flex flex-col w-96 h-48 rounded-md shadow-2xl absolute top-[20%] left-[30%] border-1 p-5 items-center  gap-5 z-20"
                : "hidden"
            }
          >
            <h1 className="text-2xl">New Note</h1>
            <input
              className="w-80 p-1 border-2 border-[#6C63FF]
               focus:outline-none rounded-md px-2 py-1.5"
              type="text"
              id="note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
            <div className="flex justify-between gap-10">
              <button
                className="w-28 cursor-pointer
                 p-1.5 rounded-sm border-[#6C63FF] border-2 text-[#6C63FF] bg-none"
                onClick={() => {
                  setBlock(false);
                }}
              >
                Cancel
              </button>
              <button
                className="w-28 cursor-pointer p-1.5 rounded-sm bg-[#6C63FF] text-white"
                onClick={Apply}
              >
                Apply
              </button>
            </div>
          </div>
          <div
            className="absolute top-[80%] left-[85%] rounded-3xl
           w-10 h-10 grid items-center justify-center  bg-[#6C63FF] "
          >
            <button className="cursor-pointer z-20" onClick={addHandler}>
              <img className="w-9 h-9 invert-100" src={add} alt="" />
            </button>
          </div>

          {/* Tasks Shows Here */}
          {filteredData.map((e) => (
            <div key={e.id} className="w-[65%] mx-auto border-b-2 p-1 my-2.5">
              <div className="flex justify-between ">
                <div className="flex gap-5 justify-center">
                  <input
                    className="w-6 cursor-pointer"
                    type="checkbox"
                    name=""
                    checked={e.completed}
                    onChange={() => dispatch(completeTask(e.id))}
                  />
                  {e.completed == true ? (
                    <del className="text-xl opacity-80">{e.task}</del>
                  ) : (
                    <p className="text-xl">{e.task}</p>
                  )}
                </div>
                <div className="flex gap-5">
                  <button
                    className="cursor-pointer edit"
                    onClick={() => dispatch(deleteTask(e.id))}
                  >
                    <img className="w-6 h-6" src={del} alt="" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;
