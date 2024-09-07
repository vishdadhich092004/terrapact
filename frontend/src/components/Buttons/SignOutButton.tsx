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
      className="text-white hover:text-gray-200 transition-colors duration-300"
    >
      <LogOut className="w-6 h-6" />
    </button>
  );
};

export default SignOutButton;
