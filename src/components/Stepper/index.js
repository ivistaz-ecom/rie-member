import { useNavigate } from "react-router-dom";
import { FaCheck } from "react-icons/fa";

function Index({ steps, type, total }) {
  const navigate = useNavigate();

  const handleClick = (value) => {
    console.log(value);
    switch (value) {
      case 1:
        navigate("/welcome");
        break;
      case 2:
        navigate("/member-registration");
        break;
      case 3:
        navigate("/member-preferences");
        break;
      case 4:
        navigate("/slp-info");
        break;
      case 5:
        navigate("/slp-preferences");
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex w-full justify-center p-4">
      <ol className="mx-auto flex w-full items-center text-xs font-medium text-gray-900 sm:text-base">
        {[...Array(total)].map((_, index) => (
          <li
            key={index}
            className={`relative flex ${
              index < steps ? "text-green-600" : "text-slate-100"
            } ${
              index === total - 1 && index >= steps
                ? ""
                : "w-full after:absolute after:left-4 after:top-3 after:inline-block after:h-0.5 after:w-full"
            } ${index < steps ? "after:bg-green-600" : "after:bg-slate-100"} after:content-[''] lg:after:top-5`}
          >
            <div
              className="z-10 block whitespace-nowrap"
              onClick={() => handleClick(index + 1)}
            >
              {index < steps ? (
                <span className="mx-auto mb-3 flex size-6 items-center justify-center rounded-full border-2 border-transparent bg-green-600 text-sm text-white lg:size-10">
                  <FaCheck />
                </span>
              ) : (
                <span
                  className={`mx-auto mb-3 flex size-6 items-center justify-center rounded-full border-2 border-transparent ${
                    index < steps
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-indigo-600"
                  } text-sm lg:size-10`}
                >
                  {index + 1}
                </span>
              )}
              {index < total - 1 && <></>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Index;
