type ContractStatusSelectProps = {
  status: string;
  onChange: (newStatus: string) => void;
};

const ContractStatusSelect = ({
  status,
  onChange,
}: ContractStatusSelectProps) => {
  const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled"];

  return (
    <div className="flex flex-col space-y-2">
      {statusOptions.map((statusOption) => (
        <label key={statusOption} className="flex items-center space-x-2">
          <input
            type="radio"
            value={statusOption}
            checked={status === statusOption}
            onChange={() => onChange(statusOption)}
            className="form-radio h-4 w-4 text-indigo-600"
          />
          <span className="text-gray-700">{statusOption}</span>
        </label>
      ))}
    </div>
  );
};

export default ContractStatusSelect;
