import Swal, { SweetAlertOptions } from "sweetalert2";

export default () => {
  Swal.fire({
    title: "Something went wrong",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Refresh page",
  } as SweetAlertOptions).then((result) => {
    if (result.value) {
      window.location.reload();
    }
  });
};
