import { Trash2 } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void
};

export default function DeleteConfirmationModal({
  open,
  onOpenChange,
  onConfirm
}: DeleteConfirmationModalProps) {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center p-6 rounded-3xl">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <Trash2 className="text-red-600 w-6 h-6" />
          </div>
        </div>

        <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>

        <p className="text-sm text-gray-500 mb-6 max-w-4/5 mx-auto">
          Are you sure you want to delete this? This action cannot be undone and
          will remove all tracking history for this application.
        </p>

        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            className="w-full rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="w-full rounded-xl"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
