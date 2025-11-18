'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Circle, Triangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { AnimatedBackground } from '@/components/animated/background';
import { GlassCard } from '@/components/animated/glass-card';
import { AnimatedButton } from '@/components/animated/animated-button';
import { SectionTitle } from '@/components/animated/section-title';
import { ParallaxShapes } from '@/components/animated/parallax-shapes';
import { MouseParallax } from '@/components/animated/mouse-parallax';
import { Counter } from '@/components/animated/counter';
import { Particles } from '@/components/animated/particles';
import { GeometricPatterns } from '@/components/animated/geometric-patterns';
import { FlowingLights } from '@/components/animated/flowing-lights';
import { SectionDivider } from '@/components/animated/section-divider';

export default function Home() {
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    email: '',
    purpose: '',
    timeline: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.company || !formData.name || !formData.email) {
      toast.error('必須項目を入力してください');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success('送信が完了しました');
        setFormData({
          company: '',
          name: '',
          email: '',
          purpose: '',
          timeline: '',
          message: '',
        });
      } else {
        toast.error('送信に失敗しました');
      }
    } catch (error) {
      toast.error('送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative">
      {!prefersReducedMotion && <AnimatedBackground />}
      {!prefersReducedMotion && <Particles />}
      {!prefersReducedMotion && <GeometricPatterns />}
      {!prefersReducedMotion && <FlowingLights />}
      {!prefersReducedMotion && <ParallaxShapes />}
      {!prefersReducedMotion && <MouseParallax />}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">

        {/* ヒーロー（ここはページ読み込み時だけアニメーション残す） */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-24 sm:mb-32 pt-8 sm:pt-12"
        >
          <div className="relative">
            <motion.div
              className="absolute -inset-20 opacity-20"
              style={{
                background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
              animate={
                !prefersReducedMotion
                  ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.3, 0.2],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                SNSで"伝わるカタチ"を
              </span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-[#cbd5e1] mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              集客・採用・ブランディングに悩む企業へ
            </motion.p>

            <motion.p
              className="text-base sm:text-lg text-[#94a3b8] mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              映像制作 × SNS運用代行
              <br className="sm:hidden" />
              企画〜撮影〜編集〜投稿〜分析までワンストップで全国対応
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <AnimatedButton onClick={scrollToForm}>
                無料相談を依頼する
              </AnimatedButton>
            </motion.div>
          </div>
        </motion.section>

        <SectionDivider variant="glow" />

        {/* お悩みセクション（スクロールリビール・遅延をカット） */}
        <section className="mb-24 sm:mb-32 ml-0 sm:ml-8">
          <SectionTitle>こんなお悩みありませんか？</SectionTitle>
          <div className="grid gap-4 sm:gap-6 max-w-3xl mx-auto">
            {[
              'SNSで本当に集客・採用できるの？',
              '投稿しても伸びない理由がわからない',
              'ショート動画を作っても問い合わせが増えない',
              '制作会社は遅い・高い・SNS向きじゃない',
              '他社は「なぜこの企画なのか」を説明してくれない',
              '社内にSNS担当者がいない／時間不足・スキル不足',
              '何を投稿すべきか迷う',
            ].map((item, index) => (
              <GlassCard key={index} delay={0} hover={false}>
                <div className="p-5 sm:p-6">
                  <p className="text-[#cbd5e1] text-base sm:text-lg">{item}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <SectionDivider variant="animated" />

        {/* 強みセクション（カードのディレイを0に） */}
        <section className="mb-24 sm:mb-32 mr-0 sm:mr-8">
          <SectionTitle>私たちの強み</SectionTitle>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              'スムーズでストレスのない制作進行',
              'SNS特化クリエイター多数在籍',
              '高品質 × 低価格（制作会社の1/2〜1/3）',
              '全国対応',
              '丸投げOK（企画〜撮影〜編集〜投稿〜分析）',
              '「なぜこの企画？」を言語化できる運用設計',
            ].map((item, index) => (
              <GlassCard key={index} delay={0}>
                <div className="p-6 sm:p-8 relative">
                  <motion.div
                    className="absolute top-4 right-4 text-6xl font-bold bg-gradient-to-br from-[#4f46e5]/20 to-[#6366f1]/10 bg-clip-text text-transparent"
                    animate={
                      !prefersReducedMotion
                        ? {
                            opacity: [0.3, 0.6, 0.3],
                          }
                        : {}
                    }
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.2,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#6366f1] flex items-center justify-center shadow-lg shadow-[#6366f1]/50"
                      whileHover={{ scale: 1.1, rotate: 5, y: -3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                    <p className="text-[#cbd5e1] text-base sm:text-lg leading-relaxed">
                      {item}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <SectionDivider variant="glow" />

        {/* 内製化支援 */}
        <section className="mb-24 sm:mb-32 ml-0 sm:ml-8">
          <SectionTitle>内製化支援</SectionTitle>
          <GlassCard hover={false} className="max-w-4xl mx-auto">
            <div className="p-8 sm:p-12">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] bg-clip-text text-transparent">
                SNS運用の「内製化」まで伴走可能
              </h3>
              <p className="text-[#cbd5e1] text-base sm:text-lg leading-relaxed">
                企画思考・台本構成・撮影方法・編集テンプレ・投稿ルール・分析方法など、
                御社のチームがSNS運用を自走できるまで徹底サポートいたします。
              </p>
            </div>
          </GlassCard>
        </section>

        <SectionDivider variant="glow" />

        {/* 提供スタイル（スクロールリビール削除、ディレイも削除） */}
        <section className="mb-24 sm:mb-32 mr-0 sm:mr-8">
          <SectionTitle>提供スタイル</SectionTitle>
          <div className="max-w-4xl mx-auto">
            <GlassCard hover={false}>
              <div className="p-8 sm:p-10">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] bg-clip-text text-transparent">
                  完全オーダーメイド
                </h3>
                <p className="text-[#cbd5e1] text-lg sm:text-xl mb-8 font-medium">
                  固定プランなし
                </p>
                <div className="space-y-3">
                  <p className="text-[#e2e8f0] text-lg sm:text-xl font-bold mb-6">
                    組み合わせ自由
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['企画', '台本', '撮影', '編集', '投稿代行', '分析', '内製化支援'].map(
                      (item, index) => (
                        <motion.span
                          key={item}
                          className="bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] px-5 py-3 rounded-xl text-[#e2e8f0] text-base sm:text-lg font-medium hover:bg白/[0.12] hover:border-[#6366f1]/60 hover:shadow-lg hover:shadow-[#6366f1]/20 transition-all"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item}
                        </motion.span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>

        <SectionDivider variant="animated" />

        {/* 実績（ディレイ削除） */}
        <section className="mb-24 sm:mb-32">
          <SectionTitle>実績</SectionTitle>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: '採用支援', result: '半年で', number: 12, suffix: '名採用成功' },
              { title: '売上改善', result: '動画導線で', number: 150, suffix: '%アップ' },
              { title: 'インフルエンサー支援', result: 'TikTok ', number: 20000, suffix: '人達成' },
            ].map((item, index) => (
              <GlassCard key={index} delay={0}>
                <div className="p-6 sm:p-8 text-center">
                  <motion.h3
                    className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] bg-clip-text text透明 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-[#cbd5e1] text-base sm:text-lg leading-relaxed">
                    {item.result}
                    <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-[#6366f1] to-[#22d3ee] bg-clip-text text-transparent">
                      <Counter value={item.number} suffix={item.suffix} />
                    </span>
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <SectionDivider variant="glow" />

        {/* 他社比較（motion.tr → tr, アニメ削除） */}
        <section className="mb-24 sm:mb-32 ml-0 sm:ml-8">
          <SectionTitle>他社比較</SectionTitle>
          <div className="overflow-x-auto">
            <GlassCard hover={false} className="min-w-[600px]">
              <div className="p-1">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.1]">
                      <th className="text-left p-4 sm:p-6 text-[#94a3b8] font-semibold text-sm sm:text-base">
                        項目
                      </th>
                      <th className="text-center p-4 sm:p-6 font-bold text-base sm:text-lg relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/10 to-transparent opacity-50" />
                        <span className="relative bg-gradient-to-r from-[#4f46e5] to-[#22d3ee] bg-clip-text text-transparent">
                          sociott
                        </span>
                      </th>
                      <th className="text-center p-4 sm:p-6 text-[#94a3b8] font-semibold text-sm sm:text-base">
                        他社
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { item: 'スピード', us: 'best', them: 'good' },
                      { item: 'SNS特化', us: 'best', them: 'fair' },
                      { item: '品質', us: 'best', them: 'best' },
                      { item: 'コスパ', us: 'best', them: 'fair' },
                      { item: 'ワンストップ', us: 'best', them: 'poor' },
                      { item: '内製化支援', us: 'best', them: 'poor' },
                      { item: '全国対応', us: 'best', them: 'fair' },
                    ].map((row, index) => (
                      <tr
                        key={index}
                        className="border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors relative"
                      >
                        <td className="p-4 sm:p-6 text-[#cbd5e1] text-sm sm:text-base">
                          {row.item}
                        </td>
                        <td className="p-4 sm:p-6 text-center relative">
                          <div className="absolute inset-0 bg-gradient-to-b from-[#6366f1]/5 to-transparent" />
                          <div className="relative inline-flex items-center justify-center">
                            <div className="relative w-8 h-8">
                              <Circle
                                className="absolute inset-0 h-8 w-8 text-[#6366f1] fill-none drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                                strokeWidth={2.5}
                              />
                              <Circle
                                className="absolute h-5 w-5 text-[#6366f1] fill-none"
                                strokeWidth={2.5}
                                style={{ top: '6px', left: '6px' }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-4 sm:p-6 text-center">
                          {row.them === 'best' && (
                            <div className="relative inline-flex items-center justify-center">
                              <div className="relative w-8 h-8">
                                <Circle
                                  className="absolute inset-0 h-8 w-8 text-[#cbd5e1] fill-none"
                                  strokeWidth={2.5}
                                />
                                <Circle
                                  className="absolute h-5 w-5 text-[#cbd5e1] fill-none"
                                  strokeWidth={2.5}
                                  style={{ top: '6px', left: '6px' }}
                                />
                              </div>
                            </div>
                          )}
                          {row.them === 'good' && (
                            <Circle
                              className="h-8 w-8 text-[#cbd5e1] mx-auto"
                              strokeWidth={2.5}
                            />
                          )}
                          {row.them === 'fair' && (
                            <Triangle
                              className="h-8 w-8 text-[#cbd5e1] mx-auto"
                              strokeWidth={2.5}
                            />
                          )}
                          {row.them === 'poor' && (
                            <X
                              className="h-8 w-8 text-[#cbd5e1] mx-auto"
                              strokeWidth={2.5}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        </section>

        <SectionDivider variant="animated" />

        {/* ワークフロー（GlassCardのdelayだけ0に） */}
        <section className="mb-24 sm:mb-32 mr-0 sm:mr-8">
          <SectionTitle>ワークフロー</SectionTitle>
          <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
            {[
              { step: '1', title: 'ヒアリング' },
              { step: '2', title: '運用設計・企画' },
              { step: '3', title: '撮影' },
              { step: '4', title: '編集・投稿' },
              { step: '5', title: '分析・改善' },
              { step: '6', title: '内製化へ移行（希望時）' },
            ].map((item, index) => (
              <GlassCard key={item.step} delay={0} hover={false}>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <motion.div
                      className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#4f46e5] to-[#6366f1] flex items-center justify-center text-xl sm:text-2xl font-bold shadow-lg shadow-[#6366f1]/50"
                      animate={
                        !prefersReducedMotion
                          ? {
                              boxShadow: [
                                '0 10px 30px rgba(99, 102, 241, 0.3)',
                                '0 10px 40px rgba(99, 102, 241, 0.5)',
                                '0 10px 30px rgba(99, 102, 241, 0.3)',
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.2,
                      }}
                    >
                      {item.step}
                    </motion.div>
                    <p className="text-[#cbd5e1] text-lg sm:text-xl font-semibold">
                      {item.title}
                    </p>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <SectionDivider variant="glow" />

        {/* CTA（スクロールリビール削除） */}
        <section className="text-center mb-24 sm:mb-32">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            SNSで"伝わるカタチ"を
            <br className="sm:hidden" />
            つくりませんか？
          </h2>
          <AnimatedButton onClick={scrollToForm}>
            無料相談を依頼する
          </AnimatedButton>
        </section>

        <SectionDivider variant="glow" />

        {/* フォーム */}
        <section id="contact-form" className="mb-16">
          <SectionTitle>無料相談フォーム</SectionTitle>

          <div className="relative">
            <motion.div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={
                !prefersReducedMotion
                  ? {
                      scale: [1, 1.3, 1],
                      x: [0, 20, 0],
                    }
                  : {}
              }
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10"
              style={{
                background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={
                !prefersReducedMotion
                  ? {
                      scale: [1, 1.2, 1],
                      x: [0, -20, 0],
                    }
                  : {}
              }
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <GlassCard hover={false} className="max-w-3xl mx-auto relative z-10">
              <div className="p-6 sm:p-10 lg:p-12">
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div>
                    <Label
                      htmlFor="company"
                      className="text-[#cbd5e1] mb-2 block text-base sm:text-lg"
                    >
                      会社名 <span className="text-[#6366f1]">*</span>
                    </Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      required
                      className="bg-white/[0.03] border-white/[0.1] text-white rounded-xl h-12 text-base sm:text-lg focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all shadow-inner"
                      placeholder="株式会社〇〇"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="name"
                      className="text-[#cbd5e1] mb-2 block text-base sm:text-lg"
                    >
                      担当者名 <span className="text-[#6366f1]">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="bg-white/[0.03] border-white/[0.1] text白 rounded-xl h-12 text-base sm:text-lg focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all shadow-inner"
                      placeholder="山田太郎"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="email"
                      className="text-[#cbd5e1] mb-2 block text-base sm:text-lg"
                    >
                      メールアドレス <span className="text-[#6366f1]">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="bg白/[0.03] border白/[0.1] text-white rounded-xl h-12 text-base sm:text-lg focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all shadow-inner"
                      placeholder="example@company.com"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="purpose"
                      className="text-[#cbd5e1] mb-2 block text-base sm:text-lg"
                    >
                      目的
                    </Label>
                    <Select
                      value={formData.purpose}
                      onValueChange={(value) =>
                        setFormData({ ...formData, purpose: value })
                      }
                    >
                      <SelectTrigger className="bg白/[0.03] border白/[0.1] text-white rounded-xl h-12 text-base sm:text-lg focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all shadow-inner">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a1e] border-white/[0.1] text-white">
                        <SelectItem value="customer-acquisition">集客</SelectItem>
                        <SelectItem value="recruitment">採用</SelectItem>
                        <SelectItem value="brand-strengthening">
                          ブランド強化
                        </SelectItem>
                        <SelectItem value="awareness">認知</SelectItem>
                        <SelectItem value="other">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="timeline"
                      className="text-[#cbd5e1] mb-2 block text-base sm:text-lg"
                    >
                      開始時期
                    </Label>
                    <Select
                      value={formData.timeline}
                      onValueChange={(value) =>
                        setFormData({ ...formData, timeline: value })
                      }
                    >
                      <SelectTrigger className="bg-white/[0.03] border-white/[0.1] text-white rounded-xl h-12 text-base sm:text-lg focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all shadow-inner">
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0a0a1e] border-white/[0.1] text-white">
                        <SelectItem value="immediately">すぐに</SelectItem>
                        <SelectItem value="within-1-month">1ヶ月以内</SelectItem>
                        <SelectItem value="within-3-months">3ヶ月以内</SelectItem>
                        <SelectItem value="undecided">未定</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="message"
                      className="text-[#cbd5e1] mb-2 block text-base sm:text-lg"
                    >
                      自由記述
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="bg-white/[0.03] border-white/[0.1] text-white rounded-xl min-h-32 text-base sm:text-lg focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 transition-all shadow-inner"
                      placeholder="ご質問やご要望などがあればご記入ください"
                    />
                  </div>

                  <AnimatedButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full"
                  >
                    {isSubmitting ? '送信中...' : '送信する'}
                  </AnimatedButton>
                </form>
              </div>
            </GlassCard>
          </div>
        </section>

        <footer className="text-center text-gray-500 text-sm py-8 border-t border-white/[0.05]">
          <p>© 2024 sociott. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
