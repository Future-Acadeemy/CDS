import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export default function Layout({ children }) {
  const { t, i18n } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <LanguageSwitcher />

      <h2 className="text-3xl font-bold text-center mb-6">
        {t(" مقياس التشوهات المعرفية")}
      </h2>
      <div className="flex-1">{children}</div>
      <footer className="mt-12 text-center text-sm text-gray-600">
        <p>
          C. Maslach, S.E. Jackson, M.P. Leiter (Eds.), Maslach Burnout
          Inventory manual (3rd ed.), Consulting Psychologists Press (1996)
        </p>
      </footer>
    </div>
  );
}
