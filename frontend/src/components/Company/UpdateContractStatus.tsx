// type ContractStatusSelectProps = {
//   status: string;
//   onChange: (newStatus: string) => void;
// };

// const ContractStatusSelect = ({
//   status,
//   onChange,
// }: ContractStatusSelectProps) => {
//   const statusOptions = ["Pending", "In Progress", "Completed", "Cancelled"];

//   return (
//     <select
//       value={status}
//       onChange={(e) => onChange(e.target.value)}
//       className="border border-gray-300 rounded px-2 py-1"
//     >
//       {statusOptions.map((status) => (
//         <option key={status} value={status}>
//           {status}
//         </option>
//       ))}
//     </select>
//   );
// };

// export default ContractStatusSelect;
