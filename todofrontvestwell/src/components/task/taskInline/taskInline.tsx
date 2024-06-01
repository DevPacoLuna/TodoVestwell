import { TaskDAO, TaskStatus } from "@/models/task";
import { Checkbox } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Snatch } from "@/components/snatch/Snatch";
import { ChipStatus } from "@/components/chipStatus/ChipStatus";

const TaskInline = ({
  task,
  handleSelectedTask,
}: {
  task: TaskDAO;
  handleSelectedTask: (task: TaskDAO) => void;
}) => {
  return (
    <div
      key={task.id}
      className="flex flex-col border-t-[1px] px-[12px] py-[10px]"
    >
      <div
        className="flex justify-between items-center"
        onClick={() => handleSelectedTask(task)}
      >
        <div className="flex gap-[10px] items-center">
          <Checkbox
            aria-label="done"
            checked={task.status === TaskStatus.DONE}
          />
          <p className={task.status === TaskStatus.DONE ? "line-through" : ""}>
            {task.title}
          </p>
        </div>
        <KeyboardArrowRightIcon />
      </div>
      <div className="flex items-center gap-[20px] h-[30px]">
        <div className="flex border-r-[1px] border-[#EBEBEB] px-[10px] py-[6px] gap-[10px]">
          <Snatch
            label={`${task.childTasks.length}`}
            backgroundColor="#EBEBEB"
            color="#000"
            size="extra-small"
          />
          <p className="text-[12px]">Subtasks</p>
        </div>
        <ChipStatus status={task.status} size="extra-small" />
      </div>
    </div>
  );
};

export default TaskInline;
