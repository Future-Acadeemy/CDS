import { create } from "zustand";
import { persist } from "zustand/middleware";
import { skillMapping } from "../data/Questions";

export const useSurveyStore = create(
  persist(
    (set, get) => ({
      phone: "",
      answers: [],
      scores: {},
      totalResult: null,

      setPhone: (phone) => set({ phone }),

      setAnswer: (index, value) =>
        set((state) => {
          const updatedAnswers = [...state.answers];
          updatedAnswers[index] = Number(value);
          return { answers: updatedAnswers };
        }),

      updateScores: () =>
        set((state) => {
          const { answers } = state;

          // Initialize score buckets
          const skillScores = {
            "النقد الذاتي": 0,
            "لوم الذات": 0,
            العجز: 0,
            اليأس: 0,
            "الانشغال بالخطر": 0,
          };

          // Sum values per domain
          answers.forEach((val, i) => {
            const skill = skillMapping(i);
            if (skill && val) {
              skillScores[skill] += val;
            }
          });

          // Map totals to levels (example: max 40 per domain, 8 items * 5)
          const finalScores = {};
          for (const [skill, total] of Object.entries(skillScores)) {
            finalScores[skill] = {
              score: total,
              level: total >= 24 ? "Strong" : "Needs Improvement", // threshold example
            };
          }

          return {
            scores: finalScores,
            totalResult: "تم حساب النتائج",
          };
        }),

      getSurveyData: () => {
        const { phone, answers, scores, totalResult } = get();
        return { phone, answers, scores, totalResult };
      },
    }),
    {
      name: "survey-storage",
      getStorage: () => localStorage,
    }
  )
);
