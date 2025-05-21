import { NextRequest, NextResponse } from 'next/server';
import { PageSpeedApiResponse } from '@/lib/utils/types';


export async function GET(req: NextRequest) {
  const url      = req.nextUrl.searchParams.get('url');
  const strategy = (req.nextUrl.searchParams.get('strategy') || 'mobile') as
    | 'mobile'
    | 'desktop';
  const apiKey   = process.env.PAGESPEED_API_KEY;

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed`
      + `?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${apiKey}`;

    const raw  = await fetch(api);
    const data = await raw.json();

    /* ---------- проверяем на ошибку от Google --------- */
    if (data.error) {
      const msg = data.error.message || 'Google API error';
      return NextResponse.json({ error: msg }, { status: raw.status || 500 });
    }

    const lr = data.lighthouseResult;
    if (!lr?.categories) {
      return NextResponse.json(
        { error: 'No Lighthouse data – проверьте доступность URL' },
        { status: 502 },
      );
    }

    /* ---------- categories ---------- */
    const cat = lr.categories;
    const getScore = (k: keyof typeof cat) =>
      cat[k] ? Math.round(cat[k].score * 100) : null;

    const scores = {
      performance   : getScore('performance')!,
      accessibility : getScore('accessibility')!,
      bestPractices : getScore('best-practices')!,
      seo           : getScore('seo')!,
      pwa           : getScore('pwa'),
    };

    /* ---------- metrics ---------- */
    const au = lr.audits;
    const safeMetric = (id: string) => ({
      displayValue : au[id]?.displayValue ?? '—',
      numericValue : au[id]?.numericValue ?? 0,
    });

    const metrics = {
      fcp : safeMetric('first-contentful-paint'),
      lcp : safeMetric('largest-contentful-paint'),
      cls : safeMetric('cumulative-layout-shift'),
      tbt : safeMetric('total-blocking-time'),
      tti : safeMetric('interactive'),
      si  : safeMetric('speed-index'),
    };

    /* ---------- остальной код без изменений ---------- */
    const opp = Object.keys(au)
      .filter(k => au[k].details?.overallSavingsMs)
      .map(k => ({
        id          : k,
        title       : au[k].title,
        description : au[k].description,
        savingsMs   : Math.round(au[k].details.overallSavingsMs),
      }));

    const diagnostics = au['diagnostics']?.details?.items?.[0] ?? {};

    let network = au['network-requests']?.details?.items ?? [];
    network = network
      .sort((a: any, b: any) => b.transferSize - a.transferSize)
      .slice(0, 10)
      .map((i: any) => ({
        url    : i.url,
        type   : i.resourceType,
        sizeKb : (i.transferSize / 1024).toFixed(1),
      }));

    const screenshots = {
      final  : au['final-screenshot']?.details?.data ?? null,
      thumbs : au['screenshot-thumbnails']?.details?.items ?? [],
    };

    const result: PageSpeedApiResponse = {
      fetchedUrl : url,
      strategy,
      scores,
      metrics,
      opportunities : opp,
      diagnostics,
      network,
      screenshots,
    };

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Failed to fetch PageSpeed data' },
      { status: 500 },
    );
  }
}
