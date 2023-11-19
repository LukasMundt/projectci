import Checkbox from "@/Components/Inputs/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { Label } from "flowbite-react";
import React from "react";

export default function FilterForm({
  headline,
  last = false,
  first = false,
  active = true,
  completed = false,
  filterName = "",
  list = [["Item", "0"]],
}) {
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const { id } = usePage().props;

  const { data, setData, post, errors, processing, recentlySuccessful } =
    useForm({
      key: "filter",
      filter:
        filterName !== "" ? filterName.toLowerCase() : headline.toLowerCase(),
      values: [],
    });

  const submit = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("projectci.kampagne.SBS-SetProps", { id: id }));
  };

  return (
    <div className="border border-0 border-l-4 dark:border-gray-500">
      <div className="flex">
        <div className={"relative " + (first ? "" : "pt-4")}>
          {first ? (
            <div className="absolute z-0 -left-2.5 bg-white dark:bg-gray-800 h-4 w-4"></div>
          ) : (
            ""
          )}
          <div
            className={
              "absolute z-1 -left-2.5 h-4 w-4 rounded-full border border-2 border-white dark:border-gray-800 " +
              (first ? "mt-1 " : "")+
              (completed?"bg-emerald-400 dark:bg-emerald-400":"bg-gray-300 dark:bg-gray-500 ")
            }
          ></div>
        </div>
        <div
          className={
            "p-3 pr-0 flex-grow " + (first ? "pt-0" : "")
          }
        >
          <h3
            className={
              "text-gray-800 dark:text-gray-200 " +
              (!active ? "text-gray-800/25 dark:text-gray-200/25" : "")
            }
          >
            {headline}
          </h3>
          <div id={"container" + headline} className={active ? "" : "hidden"}>
            <form onSubmit={submit}>
              <div className="grid mt-3 space-y-2">
                <div>
                  <Checkbox
                    id={"markAll"}
                    checked={data.values.length === list.length}
                    onChange={(e) => {
                      console.log(e.target.checked);
                      if (data.values.length > 0) {
                        setData("values", []);
                      } else {
                        list.map((item) => {
                          data.values.push(item[0] + "");
                        });
                      }
                      forceUpdate();
                    }}
                  />
                  <Label htmlFor="markAll" className="ml-2">
                    Alle markieren
                  </Label>
                </div>

                <hr className="border border-gray-600 rounded w-full sm:w-1/2" />
                {list.map((item) => {
                  return (
                    <div key={item[0] + ""}>
                      <Checkbox
                        id={item[0] + ""}
                        // value={data.values.includes(item[0])}
                        checked={data.values.includes(item[0] + "")}
                        onChange={(e) => {
                          if (data.values.includes(e.target.id)) {
                            setData(
                              "values",
                              data.values.filter(
                                (value) => value !== e.target.id
                              )
                            );
                          } else {
                            const tempData = data.values;
                            tempData.push(e.target.id + "");
                            setData("values", tempData);
                          }
                          forceUpdate();
                        }}
                      />
                      <Label className="ml-2" htmlFor={item[0]}>
                        {item[0] +
                          " (" +
                          item[1] +
                          (item[1] > 1 ? " Projekte)" : " Projekt)")}
                      </Label>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex justify-end w-full">
                <PrimaryButton disabled={processing}>Weiter</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
