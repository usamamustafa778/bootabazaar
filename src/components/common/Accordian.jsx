import React from "react";
import { useState } from "react";
import InputField from "./InputField";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";

export default function Accordian({
  faqsList,
  setFaqsList,
  faqsTitle,
  faqsDescription,
  site,
}) {
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [updateKey, setUpdateKey] = useState("");
  const [updateValue, setUpdateValue] = useState("");
  const [updateQuestion, setUpdateQuestion] = useState("");
  const [updateAnswer, setUpdateAnswer] = useState("");

  const handleUpdateKey = (key, value) => {
    setUpdateKey(key);
    setUpdateValue(value);
  };

  const handleUpdateValue = () => {
    axios
      .post(
        `https://api15.ecommcube.com/_${site.id}apidata/jtags_update`,
        null,
        {
          params: {
            [updateKey]: updateValue,
            pass: "billy",
          },
        }
      )
      .then(() => toast.success("Value updated successfully"))
      .catch((err) => toast.error(err));
    setUpdateKey("");
    setUpdateValue("");
  };

  const deleteFaq = (indexToDelete) => {
    const updatedFaqs = faqsList.filter((_, index) => index !== indexToDelete);
    setFaqsList(updatedFaqs);
  };

  const handleUpdateFAQ = (indexToUpdate) => {
    // Update FAQ object
    const updatedFAQ = {
      question: updateQuestion,
      answer: updateAnswer,
    };

    // Create a copy of the current FAQs list
    const updatedFaqsList = [...faqsList];

    // Replace the FAQ at the specified index with the updated FAQ
    updatedFaqsList[indexToUpdate] = updatedFAQ;

    // Update the state with the updated FAQs list
    setFaqsList(updatedFaqsList);

    // Clear the input fields and reset the editIndex
    setEditIndex(null);
    setUpdateQuestion("");
    setUpdateAnswer("");
  };

  return (
    <>
      <div className="flex flex-col items-center text-center mt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {editTitle ? (
              <button
                onClick={() => {
                  handleUpdateValue();
                  setEditTitle(false);
                }}
                type="button"
                className="btnPrimary text-sm p-2 bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  handleUpdateKey("faqComponentTitle", faqsTitle);
                  setEditTitle(true);
                }}
                type="button"
              >
                <PencilIcon className="w-5 text-gray-500" />
              </button>
            )}
          </div>
          {editTitle ? (
            <textarea
              onChange={(e) => setUpdateValue(e.target.value)}
              value={updateValue}
              className="mt-1 inputField w-96"
              required
            />
          ) : (
            <p className="elementHeading2">{faqsTitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-2">
            {editDescription ? (
              <button
                onClick={() => {
                  handleUpdateValue();
                  setEditDescription(false);
                }}
                type="button"
                className="btnPrimary text-sm p-2 bg-green-600"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  handleUpdateKey("faqComponentDescription", faqsDescription);
                  setEditDescription(true);
                }}
                type="button"
              >
                <Pencil className="w-5 text-gray-500" />
              </button>
            )}
          </div>
          {editDescription ? (
            <textarea
              onChange={(e) => setUpdateValue(e.target.value)}
              value={updateValue}
              className="mt-1 inputField w-96"
              required
            />
          ) : (
            <p className="text-lg">{faqsDescription}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-5">
        {faqsList.map((item, index) => (
          <div key={index} className="flex gap-3 items-start mb-6 w-full">
            <div className="flex items-center gap-2">
              {editIndex === index ? (
                <button
                  type="button"
                  onClick={() => handleUpdateFAQ(index)}
                  className="btnPrimary text-sm p-2 bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditIndex(index);
                    setUpdateQuestion(item.question);
                    setUpdateAnswer(item.answer);
                  }}
                  type="button"
                  className="btnPrimary text-sm p-2"
                >
                  <Pencil className="w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => deleteFaq(index)}
                className="btnPrimary text-sm p-2 bg-red-500"
              >
                <Trash className="w-4" />
              </button>
            </div>
            {editIndex === index ? (
              <div className="grid grid-cols-2 gap-5 w-full">
                <InputField
                  label="New Question"
                  placeholder="Enter new FAQ"
                  value={updateQuestion}
                  onChange={(e) => setUpdateQuestion(e.target.value)}
                />
                <InputField
                  label="New Answer"
                  placeholder="Enter new FAQ answer here"
                  value={updateAnswer}
                  onChange={(e) => setUpdateAnswer(e.target.value)}
                />
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-gray-50 border-2 w-full">
                <p className="font-bold">Question:</p>
                <p>{item.question}</p>
                <p className="font-bold mt-2">Answer:</p>
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
