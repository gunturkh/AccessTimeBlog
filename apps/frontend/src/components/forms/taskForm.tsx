"use client";
import { usePostTask } from "@/hooks/usePostTask";
import { useToken } from "@/hooks/useToken";
import { queryClient } from "@/libs/queryClient";
import { TaskInput } from "@/types/task";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiPlus, FiLoader } from "react-icons/fi";

export const TaskForm = () => {
  const userToken = useToken();
  const postTaskMutation = usePostTask();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TaskInput>({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = (data: TaskInput) => {
    postTaskMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
        toast.success("Task added successfully!");
        reset();
      },
      onError: (error) => {
        console.error("Error adding task:", error);
        toast.error("Error adding task");
      },
    });
  };

  if (!userToken) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 mb-4">
        You are not connected
      </div>
    );
  }

  return (
    <div className="w-full mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Add a task</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row gap-3"
      >
        <div className="flex-grow relative">
          <input
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all shadow-sm"
            type="text"
            placeholder="What do you need to do?"
            {...register("text", { required: "Please enter a task" })}
          />
          {errors.text && (
            <p className="text-red-500 text-sm mt-1 absolute">
              {errors.text.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className={`cursor-pointer flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
            postTaskMutation.isPending || !isValid
              ? "bg-gray-300 cursor-not-allowed text-gray-500"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
          }`}
          title="Add a task"
          disabled={postTaskMutation.isPending || !isValid}
        >
          {postTaskMutation.isPending ? (
            <FiLoader className="animate-spin mr-2" />
          ) : (
            <FiPlus className="mr-2" />
          )}
          Ajouter
        </button>
      </form>
    </div>
  );
};
