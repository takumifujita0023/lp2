"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    purpose: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.name || !formData.email) {
      toast.error("必要項目を入力してください");
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
        toast.success("送信が完了しました！");
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
      toast.error("送信に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-6">お問い合わせフォーム</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="company"
          placeholder="会社名"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
        />

        <input
          name="name"
          placeholder="お名前"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
        />

        <input
          name="email"
          placeholder="メールアドレス"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
        />

        <input
          name="purpose"
          placeholder="依頼内容"
          value={formData.purpose}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
        />

        <input
          name="timeline"
          placeholder="希望納期"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800"
        />

        <textarea
          name="message"
          placeholder="その他メッセージ"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 rounded bg-gray-800 h-32"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 px-6 py-3 rounded disabled:opacity-50"
        >
          {isSubmitting ? "送信中…" : "送信する"}
        </button>
      </form>
    </div>
  );
}
