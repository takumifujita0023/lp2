"use client";

import React, { useState } from "react";
import { toast } from "sonner";

type FormData = {
  company: string;
  name: string;
  email: string;
  purpose: string;
  timeline: string;
  message: string;
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    purpose: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.company || !formData.name || !formData.email) {
      toast.error("必須項目を入力してください");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("送信が完了しました");
        setFormData({
          company: "",
          name: "",
          email: "",
          purpose: "",
          timeline: "",
          message: "",
        });
      } else {
        toast.error("送信に失敗しました");
      }
    } catch (error) {
      console.error(error);
      toast.error("送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-xl p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          お問い合わせ
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">会社名 *</label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              value={formData.company}
              onChange={handleChange("company")}
              placeholder="会社名を入力してください"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">担当者名 *</label>
            <input
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="お名前を入力してください"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">メールアドレス *</label>
            <input
              type="email"
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">目的</label>
            <select
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              value={formData.purpose}
              onChange={handleChange("purpose")}
            >
              <option value="">選択してください</option>
              <option value="集客">集客</option>
              <option value="採用">採用</option>
              <option value="ブランディング">ブランディング</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">開始時期</label>
            <select
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm"
              value={formData.timeline}
              onChange={handleChange("timeline")}
            >
              <option value="">選択してください</option>
              <option value="3ヶ月以内">3ヶ月以内</option>
              <option value="半年以内">半年以内</option>
              <option value="未定">未定</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">自由記述</label>
            <textarea
              className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-sm min-h-[120px]"
              value={formData.message}
              onChange={handleChange("message")}
              placeholder="ご質問やご要望があればご記入ください"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-indigo-500 hover:bg-indigo-600 disabled:opacity-60 py-2 text-sm font-medium"
          >
            {isSubmitting ? "送信中..." : "送信する"}
          </button>
        </form>
      </div>
    </main>
  );
}
