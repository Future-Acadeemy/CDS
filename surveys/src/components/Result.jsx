import React from "react";
import { useSurveyStore } from "../store/useSurveyStore";
import { useTranslation } from "react-i18next";

const skillColors = {
  "النقد الذاتي": "bg-blue-50 text-blue-800",
  "لوم الذات": "bg-green-50 text-green-800",
  العجز: "bg-yellow-50 text-yellow-800",
  اليأس: "bg-purple-50 text-purple-800",
  "الانشغال بالخطر": "bg-red-50 text-red-800",
};

const Result = () => {
  const { scores } = useSurveyStore();
  const { t } = useTranslation();

  return (
    <div className="p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        {t("نتائج مقياس التشوهات المعرفية")}
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(scores).map(([skill, { score, level }]) => (
          <div
            key={skill}
            className={`p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition flex flex-col justify-between ${skillColors[skill]}`}
          >
            <h3 className="font-bold text-lg mb-3">{t(skill)}</h3>
            <span
              className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4 ${
                level === "Strong"
                  ? "bg-green-200 text-green-800"
                  : "bg-red-200 text-red-800"
              }`}
            >
              {level === "Strong" ? t("قوي") : t("يحتاج إلى تحسين")}
            </span>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">{t("الدرجة")}:</span> {score}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Result;
