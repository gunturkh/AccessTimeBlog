import { useMutation } from "@tanstack/react-query";
import { useToken } from "./useToken";

export const useDeleteTask = () => {
  const userToken = useToken();

  const deleteTask = async (documentId: string) => {
    const response = await fetch(`/api/tasks/${documentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    const result = await response.json();
    if (result.error) {
      throw new Error(result.error);
    }
    return result;
  };

  return useMutation({
    mutationFn: deleteTask,
  });
};
