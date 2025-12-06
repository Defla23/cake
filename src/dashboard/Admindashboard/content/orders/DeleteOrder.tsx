import { toast } from "sonner";
import { orderAPI, type Order } from "../../../../features/cakes/ordersAPI";

type DeleteOrderProps = {
  order: Order | null;
  // onClose: () => void; // callback to reset state in parent
};




console.log("I am here")
export const DeleteOrder = ({ order }: DeleteOrderProps) => {
  const [deleteOrder, { isLoading }] = orderAPI.useDeleteOrderMutation();

  const handleDelete = async () => {
    try {
      if (!order) {
        toast.error("No order selected for deletion.");
        return;
      }

      await deleteOrder(order.Id).unwrap();
      toast.success("Order deleted successfully");
      (document.getElementById('delete_modal') as HTMLDialogElement)?.close();
      // onClose();

    } catch (error: any) {
      console.log(error);
      toast.error("Failed to delete order. Please try again.");
    }
  };

  

  return (
    <dialog id="delete_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-900 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Delete Order</h3>
        <p className="mb-6">
          Are you sure you want to delete order <span className="font-semibold">{order?.Id}</span>?
        </p>
        <div className="modal-action flex gap-4">
          <button
                        data-test="delete-todo-confirm-button"
                        className="btn btn-error bg-red-500"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span className="loading loading-spinner text-primary" /> Deleting...
                            </>
                        ) : "Yes, Delete"}
                    </button>
          <button
                        className="btn bg-blue-400"
                        type="button"
                        onClick={() => (document.getElementById('delete_modal') as HTMLDialogElement)?.close()}
                    >
                        Cancel
                    </button>
        </div>
      </div>
    </dialog>
  );
};
