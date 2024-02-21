import Swal from "sweetalert2";

function ShowSuccess(message) {
  <div style={{ zIndex: 9999 }}>
    {Swal.fire({
      icon: "success",
      title: "Success",
      confirmButtonColor: "#eb0028",
      text: message,
    })}
  </div>;
}

function ShowError(message) {
  <div style={{ zIndex: 9999 }}>
    {Swal.fire({
      icon: "error",
      title: "Error",
      confirmButtonColor: "#eb0028",
      text: message,
    })}
  </div>;
}

export { ShowSuccess, ShowError };
