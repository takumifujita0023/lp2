import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  if (
    !process.env.RESEND_API_KEY ||
    !process.env.FROM_EMAIL ||
    !process.env.TO_EMAIL
  ) {
    console.error('Env missing', {
      RESEND_API_KEY: !!process.env.RESEND_API_KEY,
      FROM_EMAIL: !!process.env.FROM_EMAIL,
      TO_EMAIL: !!process.env.TO_EMAIL,
    });

    return NextResponse.json(
      { error: 'サーバー設定エラー（環境変数）' },
      { status: 500 }
    );
  }
  try {
    const body = await request.json();
    const { company, name, email, purpose, timeline, message } = body;

    if (!company || !name || !email) {
      return NextResponse.json(
        { error: '必須項目を入力してください' },
        { status: 400 }
      );
    }

    const emailContent = `
新規問い合わせがありました

【会社名】
${company}

【担当者名】
${name}

【メールアドレス】
${email}

【目的】
${purpose || '未選択'}

【開始時期】
${timeline || '未選択'}

【メッセージ】
${message || 'なし'}
    `.trim();

    const data = await resend.emails.send({
      from: process.env.FROM_EMAIL!,
      to: process.env.TO_EMAIL!,
      subject: 'SNS無料相談フォームから新規問い合わせ',
      text: emailContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: '送信に失敗しました' },
      { status: 500 }
    );
  }
}
