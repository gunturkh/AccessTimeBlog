"use client";

import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useGetBlogs } from "@/hooks/useGetBlogs";
import { queryClient } from "@/libs/queryClient";
import { GoTrash, GoCheck, GoHourglass } from "react-icons/go";
import { toast } from "react-toastify";

export const TasksList = () => {
  const { data: tasksList, isLoading } = useGetTasks();
  const { data: blogsList, isLoading: isBlogsLoading } = useGetBlogs();
  console.log("🚀 ~ TasksList ~ blogsList:", blogsList)
  const deleteTaskMutation = useDeleteTask();

  const handleDeleteTask = (documentId: string) => {
    deleteTaskMutation.mutate(documentId, {
      onSuccess: () => {
        toast.success("Task deleted");
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
      },
      onError: (error) => {
        console.error(error);
        toast.error("Error deleting task");
      },
    });
  };

  if (isLoading || isBlogsLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <GoHourglass className="text-blue-500 animate-pulse text-2xl mr-3" />
        <p className="text-gray-600 font-medium">Loading tasks...</p>
      </div>
    );
  }

  if (!tasksList?.data?.length) {
    return (
      <div className="bg-gray-50 border border-gray-100 rounded-lg p-8 text-center my-6">
        <GoCheck className="text-green-500 text-4xl mx-auto mb-3" />
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          All caught up!
        </h3>
        <p className="text-gray-500">You have no tasks on your list.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        Tasks
        <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {tasksList?.data?.length || 0}
        </span>
      </h2>

      <div className="grid gap-4">
        {tasksList?.data?.map((task) => (
          <div
            key={task.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 group relative"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-800 font-medium break-words pr-8">
                  {task.text}
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.documentId);
                }}
                className="absolute top-2 right-2 cursor-pointer text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                title="Delete task"
                disabled={deleteTaskMutation.isPending}
              >
                <GoTrash
                  className={`${
                    deleteTaskMutation.isPending
                      ? "animate-pulse text-red-300"
                      : ""
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
