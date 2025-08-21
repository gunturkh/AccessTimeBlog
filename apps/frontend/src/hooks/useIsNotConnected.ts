import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useIsNotConnected = (showMessage: boolean = false) => {
  const router = useRouter();
  const { userToken } = useContext(AuthContext);
  useEffect(() => {
    if (userToken) {
      if (showMessage) {
        toast.error("You are already connected");
      }
      router.push("/");
    }
  }, [userToken]);
};
