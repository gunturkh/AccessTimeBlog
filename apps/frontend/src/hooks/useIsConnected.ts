import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useIsConnected = () => {
  const router = useRouter();
  const { userToken } = useContext(AuthContext);
  useEffect(() => {
    if (!userToken) {
      toast.error("You are not connected");
      router.push("/login");
    }
  }, [userToken]);
};
