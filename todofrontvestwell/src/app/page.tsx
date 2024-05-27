"use client";
import { Snatch } from "@/stories/Snatch";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import { Pagination, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import { TaskDAO } from "@/models/task";
import { getAllTasks } from "@/services/task";

export default function Home() {
  const [tasks, setTasks] = useState<TaskDAO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
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
      const tasks = await getAllTasks({ limit, page });
      setTasks(tasks);
    };

    getAllTask();
  }, [page, limit]);

  return (
    <section className="px-[30px] py-[40px] max-w-[1400px]">
      <div className="flex items-center gap-[30px] font-semibold mb-[40px]">
        <h1 className="text-[56px]">Today</h1>
        <Snatch
          label={dayjs().format("DD")}
          backgroundColor="#000"
          color="#fff"
          size="medium"
        />
      </div>
      <div className="w-full">
        <button className="w-full h-[56px] rounded-[5px] border-[1px] border-[#EBEBEB] flex items-center pl-[20px] text-[#7c7c7cff] gap-[10px]">
          <AddIcon />
          Add new task
        </button>
      </div>
      {tasks.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}
      <TablePagination
        component="div"
        count={100}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </section>
  );
}
