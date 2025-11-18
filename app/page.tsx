'use client';

import { useState } from 'react';
import { Check, X, Circle, Triangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// 背景アニメーション（入力を邪魔しないように pointer-events-none）
import { AnimatedBackground } from '@/components/animated/background';
import { Particles } from '@/components/animated/particles';
import { GeometricPatterns } from '@/components/animated/geometric-patterns';
import { FlowingLights } from '@/components/animated/flowing-lights';

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
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
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
    } catch (err) {
      toast.error('送信に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 入力系の見た目を全部ここで統一（ダーク・見やすい・触りやすい）
  const inputClass =
    'bg-slate-900/70 border border-slate-600 text-white rounded-xl h-12 text-base sm:text-lg ' +
    'px-3 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 ' +
    'placeholder:text-slate-500';

  const selectTriggerClass =
    'bg-slate-900/70 border border-slate-600 text-white rounded-xl h-12 text-base sm:text-lg ' +
    'px-3 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 ' +
    'flex items-center justify-between';

  const textareaClass =
    'bg-slate-900/70 border border-slate-600 text-white rounded-xl min-h-32 text-base sm:text-lg ' +
    'px-3 py-2 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30 ' +
    'placeholder:text-slate-500';

  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white tracking-wide">{children}</h2>
  );

  const Card = ({
    children,
    className = '',
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={
        'bg-slate-900/70 border border-slate-700 rounded-2xl backdrop-blur-md shadow-xl ' +
        'shadow-black/40 ' +
        className
      }
    >
      {children}
    </div>
  );

  const Divider = () => (
    <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-slate-500/50 to-transparent" />
  );

  const PrimaryButton = ({
    children,
    ...props
  }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
      {...props}
      className={
        'inline-flex items-center justify-center rounded-xl px-8 py-3 text-base sm:text-lg font-semibold ' +
        'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg shadow-cyan-400/30 ' +
        'hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed ' +
        (props.className ?? '')
      }
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen text-white relative bg-[#020617]">
      {/* 背景アニメーション（クリックを邪魔しないように pointer-events-none） */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <AnimatedBackground />
        <Particles />
        <GeometricPatterns />
        <FlowingLights />
      </div>

      {/* コンテンツ本体 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        {/* HERO */}
        <section className="text-center mb-24 sm:mb-32 pt-8 sm:pt-12 relative">
          <div className="absolute -inset-20 opacity-30 pointer-events-none">
            <div
              className="w-full h-full"
              style={{
                background: 'radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </div>

          <div className="relative">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                SNSで&quot;伝わるカタチ&quot;を
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-slate-200 mb-4">
              集客・採用・ブランディングに悩む企業へ
            </p>

            <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              映像制作 × SNS運用代行
              <br className="sm:hidden" />
              企画〜撮影〜編集〜投稿〜分析までワンストップで全国対応
            </p>

            <PrimaryButton type="button" onClick={scrollToForm}>
              無料相談を依頼する
            </PrimaryButton>
          </div>
        </section>

        <Divider />

        {/* お悩み */}
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
              <Card key={index} className="p-5 sm:p-6">
                <p className="text-slate-200 text-base sm:text-lg">{item}</p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* 強み */}
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
              <Card key={index} className="p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-5xl sm:text-6xl font-bold text-slate-600/40">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex items-start gap-4 relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="text-slate-200 text-base sm:text-lg leading-relaxed">{item}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* 内製化 */}
        <section className="mb-24 sm:mb-32 ml-0 sm:ml-8">
          <SectionTitle>内製化支援</SectionTitle>
          <Card className="max-w-4xl mx-auto p-8 sm:p-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
              SNS運用の「内製化」まで伴走可能
            </h3>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
              企画思考・台本構成・撮影方法・編集テンプレ・投稿ルール・分析方法など、
              御社のチームがSNS運用を自走できるまで徹底サポートいたします。
            </p>
          </Card>
        </section>

        <Divider />

        {/* 提供スタイル */}
        <section className="mb-24 sm:mb-32 mr-0 sm:mr-8">
          <SectionTitle>提供スタイル</SectionTitle>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 sm:p-10">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                完全オーダーメイド
              </h3>
              <p className="text-slate-200 text-lg sm:text-xl mb-8 font-medium">固定プランなし</p>
              <p className="text-slate-100 text-lg sm:text-xl font-bold mb-6">組み合わせ自由</p>
              <div className="flex flex-wrap gap-3">
                {['企画', '台本', '撮影', '編集', '投稿代行', '分析', '内製化支援'].map((item) => (
                  <span
                    key={item}
                    className="bg-slate-900/80 backdrop-blur-sm border border-slate-600 px-5 py-3 rounded-xl text-slate-100 text-base sm:text-lg font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <Divider />

        {/* 実績 */}
        <section className="mb-24 sm:mb-32">
          <SectionTitle>実績</SectionTitle>
          <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: '採用支援', result: '半年で', number: '12名採用成功' },
              { title: '売上改善', result: '動画導線で', number: '150%アップ' },
              { title: 'インフルエンサー支援', result: 'TikTok ', number: '20,000人達成' },
            ].map((item, index) => (
              <Card key={index} className="p-6 sm:p-8 text-center">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                  {item.result}
                  <span className="font-bold text-xl sm:text-2xl text-white ml-1">{item.number}</span>
                </p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* 他社比較 */}
        <section className="mb-24 sm:mb-32 ml-0 sm:ml-8">
          <SectionTitle>他社比較</SectionTitle>
          <div className="overflow-x-auto">
            <Card className="min-w-[600px] p-1">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600/80">
                    <th className="text-left p-4 sm:p-6 text-slate-400 font-semibold text-sm sm:text-base">
                      項目
                    </th>
                    <th className="text-center p-4 sm:p-6 font-bold text-base sm:text-lg">
                      <span className="bg-gradient-to-r from-indigo-400 to-cyan-300 bg-clip-text text-transparent">
                        sociott
                      </span>
                    </th>
                    <th className="text-center p-4 sm:p-6 text-slate-400 font-semibold text-sm sm:text-base">
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
                      className="border-b border-slate-700/80 last:border-0 hover:bg-slate-800/60 transition-colors"
                    >
                      <td className="p-4 sm:p-6 text-slate-200 text-sm sm:text-base">{row.item}</td>
                      <td className="p-4 sm:p-6 text-center">
                        <div className="inline-flex items-center justify-center">
                          <div className="relative w-8 h-8">
                            <Circle
                              className="absolute inset-0 h-8 w-8 text-indigo-400 fill-none"
                              strokeWidth={2.5}
                            />
                            <Circle
                              className="absolute h-5 w-5 text-indigo-400 fill-none"
                              strokeWidth={2.5}
                              style={{ top: '6px', left: '6px' }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="p-4 sm:p-6 text-center">
                        {row.them === 'best' && (
                          <div className="inline-flex items-center justify-center">
                            <div className="relative w-8 h-8">
                              <Circle
                                className="absolute inset-0 h-8 w-8 text-slate-300 fill-none"
                                strokeWidth={2.5}
                              />
                              <Circle
                                className="absolute h-5 w-5 text-slate-300 fill-none"
                                strokeWidth={2.5}
                                style={{ top: '6px', left: '6px' }}
                              />
                            </div>
                          </div>
                        )}
                        {row.them === 'good' && (
                          <Circle className="h-8 w-8 text-slate-300 mx-auto" strokeWidth={2.5} />
                        )}
                        {row.them === 'fair' && (
                          <Triangle className="h-8 w-8 text-slate-300 mx-auto" strokeWidth={2.5} />
                        )}
                        {row.them === 'poor' && (
                          <X className="h-8 w-8 text-slate-300 mx-auto" strokeWidth={2.5} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </section>

        <Divider />

        {/* CTA */}
        <section className="text-center mb-24 sm:mb-32">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            SNSで&quot;伝わるカタチ&quot;を
            <br className="sm:hidden" />
            つくりませんか？
          </h2>
          <PrimaryButton type="button" onClick={scrollToForm}>
            無料相談を依頼する
          </PrimaryButton>
        </section>

        <Divider />

        {/* フォーム */}
        <section id="contact-form" className="mb-16">
          <SectionTitle>無料相談フォーム</SectionTitle>

          <div className="relative">
            <div
              className="absolute -top-20 -left-20 w-64 h-64 rounded-full opacity-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />
            <div
              className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
            />

            <Card className="max-w-3xl mx-auto relative z-10 p-6 sm:p-10 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                <div>
                  <Label
                    htmlFor="company"
                    className="text-slate-200 mb-2 block text-base sm:text-lg"
                  >
                    会社名 <span className="text-indigo-400">*</span>
                  </Label>
                  <Input
                    id="company"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    required
                    className={inputClass}
                    placeholder="株式会社〇〇"
                  />
                </div>

                <div>
                  <Label htmlFor="name" className="text-slate-200 mb-2 block text-base sm:text-lg">
                    担当者名 <span className="text-indigo-400">*</span>
                  </Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className={inputClass}
                    placeholder="山田太郎"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className="text-slate-200 mb-2 block text-base sm:text-lg"
                  >
                    メールアドレス <span className="text-indigo-400">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className={inputClass}
                    placeholder="example@company.com"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="purpose"
                    className="text-slate-200 mb-2 block text-base sm:text-lg"
                  >
                    目的
                  </Label>
                  <Select
                    value={formData.purpose}
                    onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border border-slate-600 text-white">
                      <SelectItem value="customer-acquisition">集客</SelectItem>
                      <SelectItem value="recruitment">採用</SelectItem>
                      <SelectItem value="brand-strengthening">ブランド強化</SelectItem>
                      <SelectItem value="awareness">認知</SelectItem>
                      <SelectItem value="other">その他</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="timeline"
                    className="text-slate-200 mb-2 block text-base sm:text-lg"
                  >
                    開始時期
                  </Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => setFormData({ ...formData, timeline: value })}
                  >
                    <SelectTrigger className={selectTriggerClass}>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border border-slate-600 text-white">
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
                    className="text-slate-200 mb-2 block text-base sm:text-lg"
                  >
                    自由記述
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={textareaClass}
                    placeholder="ご質問やご要望などがあればご記入ください"
                  />
                </div>

                <PrimaryButton type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? '送信中...' : '送信する'}
                </PrimaryButton>
              </form>
            </Card>
          </div>
        </section>

        <footer className="text-center text-slate-500 text-sm py-8 border-t border-slate-700/70">
          <p>© 2024 sociott. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
