import classNames from "classnames";
import { Step } from "pages/Admin/AddMovie";

export interface ProgressBarProps {
  step: Step;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex items-center">
          <div
            className={classNames(
              "text-xl font-bold rounded-full border-2 min-w-11 min-h-11 flex items-center justify-center ml-2",
              { "border-cinebhdarkred text-cinebhdarkred": step === "FIRST" },
              {
                "bg-cinebhdarkred text-cinebhneutral border-cinebhdarkred":
                  step !== "FIRST",
              },
            )}
          >
            1
          </div>
          <div
            className={classNames(
              "min-w-72 min-h-[1px]",
              { "bg-cinebhpale": step === "FIRST" },
              { "bg-cinebhdarkred": step !== "FIRST" },
            )}
          ></div>
          <div
            className={classNames(
              "text-xl font-bold rounded-full border-2 min-w-11 min-h-11 flex items-center justify-center",
              { "border-cinebhdarkred text-cinebhdarkred": step === "SECOND" },
              {
                "border-cinebhlightgray text-cinebhlightgray": step === "FIRST",
              },
              {
                "bg-cinebhdarkred text-cinebhneutral border-cinebhdarkred":
                  step === "THIRD",
              },
            )}
          >
            2
          </div>
          <div
            className={classNames(
              "min-w-72 min-h-[1px]",
              { "bg-cinebhpale": step !== "THIRD" },
              { "bg-cinebhdarkred": step === "THIRD" },
            )}
          ></div>
          <div
            className={classNames(
              "text-xl font-bold rounded-full border-2 min-w-11 min-h-11 flex items-center justify-center mr-2",
              { "border-cinebhdarkred text-cinebhdarkred": step === "THIRD" },
              {
                "border-cinebhlightgray text-cinebhlightgray":
                  step === "FIRST" || step === "SECOND",
              },
            )}
          >
            3
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div
            className={classNames("font-semibold", {
              "text-cinebhdarkgray": step === "FIRST",
            })}
          >
            General
          </div>
          <div
            className={classNames(
              "font-semibold",
              { "text-cinebhdarkgray": step === "SECOND" },
              { "text-cinebhlightgray": step === "FIRST" },
            )}
          >
            Details
          </div>
          <div
            className={classNames(
              "font-semibold",
              { "text-cinebhdarkgray": step === "THIRD" },
              { "text-cinebhlightgray": step === "FIRST" || step === "SECOND" },
            )}
          >
            Venues
          </div>
        </div>
      </div>
    </div>
  );
}
