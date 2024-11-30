import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../../farmer-api-clients";
import { useAppContext } from "../../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
const SignOutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validate-token");
      queryClient.setQueryData("validate-token", null);
      showToast({ message: "Signed Out!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="bg-[#a24c02] text-white px-2 py-2 shadow-sm rounded-md flex hover:scale-105 transition ease-linear ml-3"
    >
      <LogOut className="text-sm w-8 h-4" />
    </button>
  );
};

export default SignOutButton;
