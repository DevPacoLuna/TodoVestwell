"use client";
import { Snatch } from "@/components/snatch/Snatch";
import AddIcon from "@mui/icons-material/Add";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { CreateTaskDTO, TaskDAO, TaskStatus, mockTask } from "@/models/task";
import { getAllTasks } from "@/services/task";
import TaskInline from "@/components/task/taskInline/taskInline";
import TaskModal from "@/components/task/taskModal/taskModal";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/providers/handleAuthProvider";
import { Navbar } from "@/components/navbar/navbar";
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Home() {
  const { isLogged, user } = useContext(AuthContext);
  const [tasks, setTasks] = useState<TaskDAO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<TaskStatus | "All">("All");
  const [limit, setLimit] = useState(5);
  const [taskSelected, setTaskSelected] = useState<{ id?: number }>();
  const router = useRouter();

  const { data: allTasks } = useQuery({
    queryKey: ["allTasks", limit, page, status],
    queryFn: () => getAllTasks({ limit, page, status }),
    enabled: !!user,
  });

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
    if (allTasks) {
      const { countTasks, tasks } = allTasks;
      setTasks(tasks);
      setCount(countTasks);
    }
  }, [allTasks]);

  useEffect(() => {
    if (isLogged === false) {
      router.push("/auth");
    }
  }, [isLogged, router]);

  if (isLogged && user) {
    return (
      <>
        <Navbar />
        <div className="flex">
          <section className="px-[30px] py-[40px] w-[1100px]">
            <div className="flex items-center gap-[30px] font-semibold mb-[40px]">
              <h1 className="text-[56px]">Today</h1>
              <Snatch
                label={dayjs.tz(dayjs(), "America/Toronto").format("DD")}
                backgroundColor="#000"
                color="#fff"
                size="medium"
              />
            </div>
            <div className="w-full mb-[20px]">
              <button
                className="w-full h-[56px] rounded-[5px] border-[1px] border-[#EBEBEB] flex items-center pl-[20px] text-[#7c7c7cff] gap-[10px]"
                onClick={() => setTaskSelected({})}
              >
                <AddIcon />
                Add new task
              </button>
            </div>

            <div className="flex flex-col gap-[20px]">
              <FormControl className="self-end">
                <InputLabel id="demo-simple-select-label">
                  Filtrar por:
                </InputLabel>
                <Select
                  value={status}
                  label="Filtrar por:"
                  className="w-[200px]"
                  onChange={(e) =>
                    setStatus(e.target.value as TaskStatus | "All")
                  }
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  <MenuItem value={"To Do"}>To Do</MenuItem>
                  <MenuItem value={"In progress"}>In progress</MenuItem>
                  <MenuItem value={"Done"}>Done</MenuItem>
                </Select>
              </FormControl>
              <div>
                {tasks.map((task) => (
                  <TaskInline
                    task={task}
                    key={task.id}
                    handleSelectedTask={setTaskSelected}
                  />
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
          {taskSelected && (
            <TaskModal task={taskSelected} setTaskSelected={setTaskSelected} />
          )}
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-center h-[800px] w-[1400px]">
      <CircularProgress />
    </div>
  );
}
