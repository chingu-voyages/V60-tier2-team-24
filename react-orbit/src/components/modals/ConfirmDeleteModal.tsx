import { Trash2 } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type DeleteConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function DeleteConfirmationModal({
  open,
  onOpenChange,
  onConfirm,
  loading,
}: DeleteConfirmationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm text-center p-6 rounded-3xl">
        <div className="flex justify-center mb-2">
          <div className="bg-red-100 p-4 rounded-full">
            <Trash2 className="text-red-600 w-6 h-6" />
          </div>
        </div>

        <h2 className="text-lg font-bold">Confirm Deletion</h2>

        <p className="text-sm text-gray-500 mb-3">
          Are you sure you want to delete this? This action cannot be undone and
          will remove all tracking history for this application.
        </p>

        <div className="flex justify-center gap-3">
          <Button
            variant="outline"
            className="w-full rounded-xl py-5 bg-blue-200 text-gray-700 font-semibold cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            className="w-full rounded-xl py-5 font-semibold cursor-pointer"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
