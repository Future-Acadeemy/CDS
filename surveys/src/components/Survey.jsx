import React, { useEffect, useState } from "react";
import { questions, options } from "../data/Questions"; // will hold CDS questions in Arabic + scoring
import { useSurveyStore } from "../store/useSurveyStore";
import { useNavigate } from "react-router-dom";
import useSubmit from "../hooks/useSubmit";
import { useUserStore } from "../store/useUserStore";
import { useTranslation } from "react-i18next";

const Survey = () => {
  const { answers, setAnswer, updateScores, getSurveyData, setPhone } =
    useSurveyStore();

  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const { t } = useTranslation();
  const mutation = useSubmit();

  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateScores(); // calculate SC, SB, HLP, HOP, PWD
    const surveyData = getSurveyData();

    try {
      await mutation.mutateAsync(surveyData);
      navigate("/report");
    } catch (error) {
      setValidationError("فشل الإرسال. يرجى المحاولة مرة أخرى.");
    }
    navigate("/report");

    console.log("surveyData to submit:- ", surveyData);
  };

  useEffect(() => {
    if (userInfo?.phone) setPhone(userInfo.phone);
  }, [setPhone, userInfo.phone]);

  return (
    <div className="w-full max-w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form className="space-y-8" onSubmit={handleSubmit}>
        <table className="w-full border-collapse border border-gray-300 text-right">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-3 text-center">
                {t("البند")}
              </th>
              {options.map((option) => (
                <th
                  key={option.value}
                  className="border border-gray-300 px-4 py-3 text-center"
                >
                  {t(option.label)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {questions.map((q, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-3">
                  {index + 1}. {t(q)}
                </td>
                {options.map((option) => (
                  <td
                    key={option.value}
                    className="border border-gray-300 px-4 py-3 text-center"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option.value}
                      checked={answers[index] === option.value}
                      onChange={(e) => setAnswer(index, e.target.value)}
                      required
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {validationError && (
          <p className="text-red-500 text-center">{validationError}</p>
        )}

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
            type="submit"
          >
            {t("إرسال")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Survey;
