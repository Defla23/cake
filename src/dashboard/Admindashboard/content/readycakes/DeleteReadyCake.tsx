import { readyCakesAPI, type readycakes } from "../../../../features/cakes/readycakeApi";
import { toast } from "sonner";

type DeleteReadyCakeProps = {
  readycake: readycakes | null;
};

export const DeleteReadyCake = ({ readycake }: DeleteReadyCakeProps) => {
  const [deletecake, { isLoading }] = readyCakesAPI.useDeleteCakeMutation();

  const handleDelete = async () => {
    try {
      if (!readycake) {
        toast.error("No cake selected for deletion.");
        return;
      }

      await deletecake(readycake.cakeId).unwrap();

      toast.success("Cake deleted successfully");

      (document.getElementById("delete_modal") as HTMLDialogElement)?.close();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete cake. Please try again.");
    }
  };

  return (
    <dialog id="delete_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-800 text-white rounded-2xl w-full max-w-md p-6">
        <h3 className="text-2xl font-bold mb-4 text-center">Delete Cake</h3>

        <p className="mb-6 text-center text-lg">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{readycake?.cakeName}</span>?
        </p>

        <div className="modal-action justify-center flex gap-4 mt-4">
          <button
            className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-colors duration-300"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner text-white mr-2" />
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>

          <button
            className="btn btn-outline btn-white px-6 py-3 rounded-full"
            type="button"
            onClick={() =>
              (document.getElementById("delete_modal") as HTMLDialogElement)?.close()
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};
