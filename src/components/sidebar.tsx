import "../css/sidebar.css";
import { open } from "@tauri-apps/plugin-dialog";
import { useStateStore } from "../store.ts";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const paths = useStateStore((state) => state.paths);
  const updatePath = useStateStore((state) => state.updatePath);
  const addPath = useStateStore((state) => state.addPath);
  const navigate = useNavigate();

  const readFileContents = async () => {
    try {
      const files = await open({
        multiple: true,
        directory: false,
      });

      console.log(files);

      if (files !== null && files.length > 0) {
        files.forEach((f) => {
          addPath(f);
        });
        updatePath(files[0]);
        navigate(`/file${files[0]}`);
        console.log(`Navigated to: /file${files[0]}`);
      } else {
        // Handle error
        console.error("Selected files are null");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleVolverHome = () => {
    navigate("/");
  };

  const handleListRedirect = (path: string) => {
    updatePath(path);
    navigate(`/file${path}`);
    console.log(window.location);
  };

  return (
    <div className="sidebar">
      <h1>Xirimir</h1>
      <button onClick={readFileContents}>Open file</button>
      <button onClick={handleVolverHome}>Volver al home</button>
      <ul className="paths">
        {[...paths].map((path, i) => (
          <li key={i}>
            <button onClick={() => handleListRedirect(path)}>
              {path.split("/").pop()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
