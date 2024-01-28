import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

function LoadingSpinner() {
  return (
    <div class="clearfix spinner">
  <div class="spinner-border float-end"
  style={{width:"10rem", height:"10rem", }}
  role="status">
  </div>
</div>
  );
}

export default LoadingSpinner;
