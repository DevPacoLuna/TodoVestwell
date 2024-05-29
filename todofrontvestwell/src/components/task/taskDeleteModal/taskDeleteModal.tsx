import { Button } from "@/stories/Button";
import { Modal } from "@mui/material";

interface TaskDeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleDeleteTask: () => Promise<void>;
}

export const TaskDeleteModal = ({
  open,
  handleClose,
  handleDeleteTask,
}: TaskDeleteModalProps) => {
  return (
    <Modal
      className="flex items-center justify-center"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <div className="bg-[#fff] w-[350px] h-[220px] rounded-[8px] flex items-center flex-col justify-center p-[20px] gap-[25px]">
        <div className="flex flex-col items-center">
          <h2 className="text-[20px] font-bold">Delete task</h2>
          <p className="text-[18px]">Are you sure you want to delete?</p>
        </div>
        <div className="flex gap-[20px]">
          <Button onClick={handleDeleteTask} backgroundColor="#eb5757">
            Yes, I&apos;m sure
          </Button>
          <Button onClick={handleClose}>No, I&apos;m not</Button>
        </div>
      </div>
    </Modal>
  );
};
