
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  const apiKey = process.env.PAGESPEED_API_KEY;

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      url
    )}&strategy=mobile&key=${apiKey}`;

    const res = await fetch(api);
    const data = await res.json();

    const result = {
      score: Math.round(data.lighthouseResult.categories.performance.score * 100),
      fcp: data.lighthouseResult.audits['first-contentful-paint'].displayValue,
      lcp: data.lighthouseResult.audits['largest-contentful-paint'].displayValue,
      cls: data.lighthouseResult.audits['cumulative-layout-shift'].displayValue,
      tti: data.lighthouseResult.audits['interactive'].displayValue,
    };

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch PageSpeed data' }, { status: 500 });
  }
}
