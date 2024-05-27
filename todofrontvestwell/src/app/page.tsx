"use client";
import { Snatch } from "@/stories/Snatch";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import { TaskDAO, TaskStatus } from "@/models/task";
import { getAllTasks } from "@/services/task";
import TaskInline from "@/components/task/taskInline/taskInline";

export default function Home() {
  const [tasks, setTasks] = useState<TaskDAO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO);
  const [limit, setLimit] = useState(5);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
  };

  useEffect(() => {
    const getAllTask = async () => {
      const { tasks, countTasks } = await getAllTasks({ limit, page, status });
      setTasks(tasks);
      setCount(countTasks);
    };

    getAllTask();
  }, [page, limit, status]);

  return (
    <section className="px-[30px] py-[40px] max-w-[1100px]">
      <div className="flex items-center gap-[30px] font-semibold mb-[40px]">
        <h1 className="text-[56px]">Today</h1>
        <Snatch
          label={dayjs().format("DD")}
          backgroundColor="#000"
          color="#fff"
          size="medium"
        />
      </div>
      <div className="w-full mb-[20px]">
        <button className="w-full h-[56px] rounded-[5px] border-[1px] border-[#EBEBEB] flex items-center pl-[20px] text-[#7c7c7cff] gap-[10px]">
          <AddIcon />
          Add new task
        </button>
      </div>

      <div className="flex flex-col gap-[20px]">
        <FormControl className="self-end">
          <InputLabel id="demo-simple-select-label">Filtrar por:</InputLabel>
          <Select
            value={status}
            label="Filtrar por:"
            className="w-[200px]"
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <MenuItem value={"To Do"}>To Do</MenuItem>
            <MenuItem value={"In progress"}>In progress</MenuItem>
            <MenuItem value={"Done"}>Done</MenuItem>
          </Select>
        </FormControl>
        <div>
          {tasks.map((task) => (
            <TaskInline task={task} key={task.id} />
          ))}
        </div>
        <TablePagination
          component="div"
          count={count}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 20]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </section>
  );
}
