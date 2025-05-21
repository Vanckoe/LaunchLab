export interface FunctionCPU {
  cpu: string;
  memory: string;
}

export interface BuildStatus {
  state: string;
  errors: string[];
}

export interface GetProjectId {
  projectId: string;
  github: string;
  domainName: string;
  frameworkPreset: string;
  link: string;
  lastUpdated: string;
  securityLevel: string;
  functionCPU: FunctionCPU;
  buildStatus: BuildStatus;
}


export interface PageSpeedApiResponse {
    fetchedUrl: string;
    strategy: 'mobile' | 'desktop';
    scores: {
      performance: number;
      accessibility: number;
      bestPractices: number;
      seo: number;
      pwa: number | null;
    };
    metrics: Record<
      'fcp' | 'lcp' | 'cls' | 'tbt' | 'tti' | 'si',
      { displayValue: string; numericValue: number }
    >;
    opportunities: {
      id: string;
      title: string;
      description: string;
      savingsMs: number;
    }[];
    diagnostics: Record<string, any>;
    network: { url: string; type: string; sizeKb: string }[];
    screenshots: {
      final: string | null;
      thumbs: { data: string; timing: number }[];
    };
  }
  