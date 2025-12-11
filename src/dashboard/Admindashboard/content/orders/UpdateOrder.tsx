import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";
import { toast } from "sonner";
import { orderAPI, type Order } from "../../../../features/cakes/ordersAPI";
import { SampleImages } from "../../../../assets/SampleImages";

type UpdateOrderProps = {
  order: Order | null;
};

type UpdateOrderInputs = { 
  Size: string;
  Flavor: string;
  Message: string;
  Status: string; 
  PaymentStatus: string; 
  Price: number;
  SampleImages: string;
  ColorPreferences: string;
  Notes: string;
  ExtendedDescription: string;
  
};

const schema = yup.object({  
  Price: yup.number().required(),
  PaymentStatus: yup.string().required(),
  SampleImages: yup.string().required(),
  ColorPreferences: yup.string().required(),
  Status: yup.string().required("Status is required"),
  Size: yup.string().required(),
  Flavor: yup.string().required(),
  Message: yup.string().required(),
  Notes: yup.string().required(),
  ExtendedDescription: yup.string().required(),  
});

export const UpdateOrder = ({ order }: UpdateOrderProps) => {
  const [updateOrder, { isLoading }] = orderAPI.useUpdateOrderDetailsMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UpdateOrderInputs>({
    resolver: yupResolver(schema),
  
  });

  useEffect(() => {
    if (order) {      
      setValue("Price", order.Price);
      setValue("PaymentStatus", order.PaymentStatus || "");
      setValue("Status", order.Status);
      setValue("Size", order.Size);
      setValue("Flavor", order.Flavor);
      setValue("Message", order.Message);
      setValue("Notes", order.Notes);
      setValue("ExtendedDescription", order.ExtendedDescription);
      setValue("SampleImages", order.SampleImages || SampleImages[0]);
      setValue("ColorPreferences", order.ColorPreferences || "");    
      
    } else {
      reset();
    }
  }, [order, setValue, reset]);

  const onSubmit: SubmitHandler<UpdateOrderInputs> = async (data) => {
    try {
      if (!order) {
        toast.error("No order selected for update.");
        return;
      }

       await updateOrder({ OrderID: order.Id, data }).unwrap();
      toast.success("Order updated successfully!");
      (document.getElementById('update_modal') as HTMLDialogElement)?.close();
       //onClose();

    } catch (error: any) {
      console.error(error);
      toast.error("Failed to update order. Please try again.");
    }
  };


  return (
    <dialog id="update_modal" className="modal sm:modal-middle">
      <div className="modal-box bg-gray-800 text-white w-full max-w-xs sm:max-w-lg mx-auto rounded-lg">
        <h3 className="font-bold text-lg mb-4">Update Order {order?.Id}</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <select
            {...register("Status")}
          
            className="select select-bordered w-full bg-emerald-300 text-gray-900"
          >
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="baking">Baking</option>
            <option value="ready">Ready</option>
            <option value="completed">Completed</option>
          </select>
          {errors.Status && <span className="text-red-600">{errors.Status.message}</span>}
          <input
            {...register("Price")}
            type="number"
            step="0.01"
            placeholder="Price"
            className="input input-bordered w-full bg-white text-gray-800"
          />
          < select
            {...register("PaymentStatus")}
            className="select select-bordered w-full bg-emerald-300 text-gray-900"
          >
            <option value="">Select Payment Status</option>
            <option value="unpaid">Unpaid</option>
            <option value="paid">Paid</option>
          </select>        
         
          <input
            {...register("Size")}
            placeholder="Size"
            className="input input-bordered w-full bg-white text-gray-800"
          />
          <input
            {...register("Flavor")}
            placeholder="Flavor"
            className="input input-bordered w-full bg-white text-gray-800"
          />
          <input
            {...register("Message")}
            placeholder="Message"
            className="input input-bordered w-full bg-white text-gray-800"
          />
          <input
            {...register("Notes")}
            placeholder="Notes"
            className="input input-bordered w-full bg-white text-gray-800"
          />
          <input
            {...register("ExtendedDescription")}
            placeholder="Extended Description"
            className="input input-bordered w-full bg-white text-gray-800"
          />
          <input
            {...register("SampleImages")}
            placeholder="Sample Images URL"
            className="input input-bordered w-full bg-white text-gray-800"
          />
          <input
            {...register("ColorPreferences")}
            placeholder="Color Preferences"
            className="input input-bordered w-full bg-white text-gray-800"
          />  
         
          <div className="modal-action">
                        <button
                            data-test="update-todo-button"
                            type="submit" className="btn btn-primary bg-green-500" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="loading loading-spinner text-primary" /> Updating...
                                </>
                            ) : "Update"}
                        </button>
                        <button
                            className="btn bg-blue-400"
                            type="button"
                            onClick={() => {
                                (document.getElementById('update_modal') as HTMLDialogElement)?.close();
                                reset();
                            }}
                        >
                            Close
                        </button>

          
          
          </div>
        </form>
      </div>
    </dialog>
  );
};
