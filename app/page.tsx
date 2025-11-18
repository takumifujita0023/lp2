"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedBackground from "@/components/AnimatedBackground";
import Particles from "@/components/Particles";
import GeometricPatterns from "@/components/GeometricPatterns";
import FlowingLights from "@/components/FlowingLights";
import ParallaxShapes from "@/components/ParallaxShapes";
import MouseParallax from "@/components/MouseParallax";
import { toast } from "react-hot-toast";

export default function Home() {
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    purpose: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen text-white relative">
      {!prefersReducedMotion && <AnimatedBackground />}
      {!prefersReducedMotion && <Particles />}
      {!prefersReducedMotion && <GeometricPatterns />}
      {!prefersReducedMotion && <FlowingLights />}
      {!prefersReducedMotion && <ParallaxShapes />}
      {!prefersReducedMotion && <MouseParallax />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24 sm:mb-32 pt-8 sm:pt-12"
        >
          <div className="relative">
            <h1 className="text-3xl sm:text-5xl font-bold gradient-title mb-6">
              お問い合わせ
            </h1>
            <p className="text-base sm:text-lg text-gray-300">
              ご質問・ご相談など、お気軽にお問い合わせください
            </p>
          </div>
        </motion.section>

        <div
          id="contact-form"
          className="mt-12 bg-white/[0.03] backdrop-blur-md border border-white/[0.07] shadow-2xl shadow-black/30 rounded-2xl p-6 sm:p-10"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm mb-2">会社名 *</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full rounded-lg px-4 py-3 bg-white/[0.08] border border-white/[0.1] focus:border-[#6366f1] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">担当者名 *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg px-4 py-3 bg-white/[0.08] border border-white/[0.1] focus:border-[#6366f1] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">メールアドレス *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg px-4 py-3 bg-white/[0.08] border border-white/[0.1] focus:border-[#6366f1] outline-none"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">目的</label>
              <select
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
                className="w-full rounded-lg px-4 py-3 bg-white/[0.08] border border-white/[0.1] focus:border-[#6366f1] outline-none"
              >
                <option value="">選択してください</option>
                <option value="採用">採用</option>
                <option value="集客">集客</option>
                <option value="その他">その他</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">開始時期</label>
              <select
                value={formData.timeline}
                onChange={(e) =>
                  setFormData({ ...formData, timeline: e.target.value })
                }
                className="w-full rounded-lg px-4 py-3 bg-white/[0.08] border border-white/[0.1] focus:border-[#6366f1] outline-none"
              >
                <option value="">選択してください</option>
                <option value="すぐに">すぐに</option>
                <option value="3ヶ月以内">3ヶ月以内</option>
                <option value="未定">未定</option>
              </select>
            </div>

            <div>
              <label className="block text-sm mb-2">自由記述</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full rounded-lg px-4 py-3 bg-white/[0.08] border border-white/[0.1] focus:border-[#6366f1] outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl text-white font-semibold hover:opacity-90 transition"
            >
              {isSubmitting ? "送信中..." : "送信する →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;
