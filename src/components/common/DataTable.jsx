import { useState } from "react";
import SearchBox from "./SearchBox";
import { LoaderCircle } from "lucide-react";

const DataTable = ({
  heads,
  items,
  className,
  tableHeight,
  isLoading,
  totalRecords,
  tdClass,
  denseRow,
  title,
  searchBox,
  handleSubmit,
  extras,
  emptyMessage,
  headerColor,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {(title || extras || searchBox) && (
        <div
          className={`flex items-center justify-between mb-5 px-6 py-2 ${
            headerColor
              ? headerColor
              : "bg-warmGray text-white dark:bg-gray-800"
          }`}
        >
          <div className="flex items-center gap-6">
            {title && <h4 className="capitalize font-bold">{title}</h4>}
            {searchBox && (
              <div className="relative w-fit">
                <SearchBox
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 dark:border-white/25 text-black rounded bg-white dark:bg-gray-600 dark:text-white w-fit"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  inputPadding="py-[5px]"
                />
                {searchQuery && (
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-50"
                    onClick={() => setSearchQuery("")}
                  >
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            {extras}
            {handleSubmit && (
              <>
                {isLoading ? (
                  <div className="bg-blue/10 flex items-center justify-center rounded-md py-2 w-48">
                    <img src="/loading.gif" className="w-7" alt="" />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="btnPrimary bg-green-600"
                  >
                    Save and Update
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <div className="px-6 py-2">
        <div
          className={`rounded w-full bg-white dark:bg-gray-800 dark:bg-blue  ${className}`}
        >
          <div
            className={`w-full overflow-y-scroll ${
              totalRecords ? "h-[calc(100vh-235px)]" : "h-[calc(100vh-165px)]"
            } ${tableHeight}`}
          >
            <table className="min-w-full">
              <thead className="sticky top-0 p-0 z-10">
                <tr className="divide-x divide-gray-200 dark:divide-white/50 border-b border-gray-200 dark:border-white/50">
                  {heads?.map((head, key) => (
                    <th className="!p-0" key={key} scope="col">
                      <div className="tableHead text-gray-500 w-full h-full bg-white dark:bg-gray-800">
                        {head}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-white/20 h-full overflow-y-scroll  dark:text-white/70">
                {items
                  ?.filter((item) =>
                    Object.values(item)?.some((value) =>
                      value
                        ?.toString()
                        ?.toLowerCase()
                        ?.includes(searchQuery.toLowerCase())
                    )
                  )
                  ?.map((item, index) => (
                    <tr
                      key={index}
                      className="divide-x dark:divide-white/20 hover:bg-gray-100 dark:hover:bg-white/10"
                    >
                      {Object.values(item).map((value, key) => (
                        <td
                          className={`px-4  ${denseRow ? "py-1" : "py-3"}`}
                          key={key}
                        >
                          <div
                            className={`text-sm  whitespace-nowrap ${tdClass}`}
                          >
                            {value}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>

            {!items && (
              <div className="flex items-center justify-center mt-44 w-full">
                {emptyMessage}
              </div>
            )}
            {items?.length === 0 && !isLoading && (
              <div className="flex items-center justify-center mt-44 w-full">
                No Data Found
              </div>
            )}

            {isLoading && (
              <div className="flex flex-col items-center w-full p-24 gap-5">
                <LoaderCircle className="h-12 w-12 animate-spin text-primary" />
                <p>Loading...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
