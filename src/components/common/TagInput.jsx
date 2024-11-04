import React, { useState } from "react";
import { X } from "lucide-react";
import InputField from "./InputField";

const TagInput = ({ tags = [], setTags }) => {
  const [input, setInput] = useState("");

  const addTag = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <>
      <InputField
        label="Tags"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={addTag}
        placeholder="Add a tag and press Enter"
      />
      <div className="flex flex-wrap mt-2 gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center text-sm px-2 py-1 bg-orange-100 text-primary rounded"
          >
            {tag}
            <button
              onClick={() => removeTag(index)}
              className="ml-2 focus:outline-none"
            >
              <X className="h-6 w-4" />
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default TagInput;
