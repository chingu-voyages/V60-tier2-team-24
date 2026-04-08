import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function ApplicationActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="text-gray-400" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem className="p-4">
          <Pencil className="mr-2 text-gray-400" />
          <span className="font-semibold text-sm">Edit Application</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="p-4">
          <Trash2 className="mr-2 text-red-500" />
          <span className="font-semibold text-sm text-red-500">
            Delete Application
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ApplicationActions;
