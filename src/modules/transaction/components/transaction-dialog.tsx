import ResponsiveDialog from "@/components/responsive-dialog";
import TransactionForm from "./transaction-form";

interface NewTransactionDialogPorps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewTransactionDialog = ({ open, onOpenChange }: NewTransactionDialogPorps) => {
  return (
    <ResponsiveDialog
      title="New Transaction"
      description="Create a new Transaction"
      open={open}
      onOpenChange={onOpenChange}
    >
      <TransactionForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};

export default NewTransactionDialog;
