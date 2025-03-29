// import { Card } from "@/components/ui/card";
// import { Trash2, CheckCircle2, Clock, Loader2 } from "lucide-react";
// import { Link } from "@tanstack/react-router";
// import { useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { formatDistanceToNow } from "date-fns";
// import { usegoalDelete } from "@/api/hooks/hook";

// type GoalStatus = "ACTIVE" | "COMPLETED" | "OVERDUE";

// type GoalView = {
//   id: string;
//   name: string;
//   description: string;
//   created_at: string;
//   status: GoalStatus;
//   due_date: string;
//   user_id: string;
//   cover_image: string | null;
// };

// export default function GoalView({ goal }: { goal: GoalView }) {
//   const { mutate, isPending, isSuccess, isError, error } = usegoalDelete();
//   const queryClient = useQueryClient();

//   const { id, name, created_at, description, cover_image, due_date, status } =
//     goal;

//   const onDelete = () => {
//     mutate(id);
//   };

//   if (isError) {
//     toast.error(error?.message || "Failed to delete goal");
//   }

//   if (isSuccess) {
//     queryClient.invalidateQueries({ queryKey: ["goals"] });
//   }

//   const dueDate = new Date(due_date);
//   const isOverdue = dueDate < new Date() && status !== "COMPLETED";

//   return (
//     <Card className="bg-white  flex flex-col justify-between items-center gap-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 rounded-lg">
//       {/* Cover Image */}
//       <div className=" w-full mb-3 aspect-video">
//         <img
//           src={cover_image || "/default-goal-image.jpg"}
//           alt={name}
//           className="w-full h-full object-cover"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = "/default-goal-image.jpg";
//           }}
//         />
//       </div>

//       {/* Goal Info */}
//       <div className="w-full space-y-2 px-4">
//         <div className="flex justify-between items-center gap-x-4">
//           <h1 className="text-lg font-semibold text-gray-900  hover:underline hover:text-goal-600 transition-colors">
//             <Link to="/dashboard/goal/$goalId" params={{ goalId: id }}>
//               {name}
//             </Link>
//           </h1>

//           <div className="flex items-center gap-2">
//             {status === "COMPLETED" ? (
//               <CheckCircle2 className="h-4 w-4 text-green-500" />
//             ) : (
//               <Clock className="h-4 w-4 text-yellow-500" />
//             )}
//             <span className="text-xs font-medium text-gray-500">
//               {status.toLowerCase()}
//             </span>
//           </div>
//         </div>

//         <p className="text-sm text-start mt-2 text-gray-600 line-clamp-2">
//           {description}
//         </p>
//       </div>

//       {/* Dates and Actions */}
//       <div className="flex justify-between w-full items-end mb-4">
//         <div className="space-y-1 w-full flex items-center justify-between px-3">
//           <p className="text-xs text-gray-400">
//             Created:{" "}
//             {formatDistanceToNow(new Date(created_at), { addSuffix: true })}
//           </p>
//           <p
//             className={`text-sm ${isOverdue ? "text-red-500 font-medium" : "text-gray-400"}`}
//           >
//             Due: {formatDistanceToNow(dueDate, { addSuffix: true })}
//             {isOverdue && " (Overdue)"}
//           </p>
//         </div>
//       </div>
//     </Card>
//   );
// }
