import React from "react";
import MarkdownIt from "markdown-it";

const MarkdownConverter = ({
  setNewValue,
  newValue,
  newKey,
  title,
  loading,
  placeholder,
  height,
  className,
  outputStyle,
}) => {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(newValue);

  return (
    <div className={`grid grid-cols-2 gap-7 mt-4 ${className}`}>
      <div>
        <label htmlFor="new-value" className="inputLabel">
          {title || "Tag Value"}
        </label>
        <textarea
          id="new-value"
          placeholder={placeholder || `Enter ${newKey} tag value here`}
          className={`inputField mt-1 ${
            height ? height : "h-[calc(100vh-360px)]"
          }`}
          value={newValue}
          onChange={(event) => setNewValue(event.target.value)}
          required
        />
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-10 w-full">
          <img src="/loading.gif" className="w-16" alt="" />
        </div>
      ) : (
        <div>
          <label htmlFor="new-value" className="inputLabel">
            Markdown Converted Text
          </label>
          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className={`inputField bg-white min-h-fit mt-1 overflow-y-scroll markdown-content ${outputStyle} ${
              height ? height : "h-[calc(100vh-360px)]"
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default MarkdownConverter;
