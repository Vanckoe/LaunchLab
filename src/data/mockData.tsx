import { GetProjectId } from '@/lib/utils/types';

export const mockLogs = [
  '[22:34:48.551] Build machine configuration: 2 cores, 8 GB',
  '[22:34:48.570] Cloning github.com/Vanckoe/LaunchLab (Branch: main, Commit: 992e5ce)',
  '[22:34:48.884] Cloning completed: 313.000ms',
  '[22:34:50.951] Restored build cache from previous deployment (CH1F82Wxv7PQYCVftg3RDoMJFnEd)',
  '[22:34:52.145] Running "install" command: `bun install`...',
  '[22:34:52.180] bun install v1.2.13 (64ed68c9)',
  '[22:34:52.196] Resolving dependencies',
  '[22:34:52.293] Resolved, downloaded and extracted [2]',
  '[22:34:52.304] Saved lockfile',
  '[22:34:52.305] Checked 87 installs across 129 packages (no changes) [141.00ms]',
  '[22:34:52.309] Detected Next.js version: 15.3.2',
  '[22:35:20.755] ',
  '[22:34:52.309] Running "bun run build"',
  '[22:34:52.317] $ next build',
  '[22:34:53.334]    ▲ Next.js 15.3.2',
  '[22:34:53.336]    Creating an optimized production build ...',
  '[22:35:01.089]  ✓ Compiled successfully in 4.0s',
  '[22:35:01.092]    Linting and checking validity of types ...',
  '[22:35:05.882]    Collecting page data ...',
  '[22:35:07.626]    Generating static pages (0/8) ...',
  '[22:35:08.740]    Generating static pages (2/8)',
  '[22:35:08.741]    Generating static pages (4/8)',
  '[22:35:08.741]    Generating static pages (6/8)',
  '[22:35:08.741]  ✓ Generating static pages (8/8)',
  '[22:35:09.085]    Finalizing page optimization ...',
  '[22:35:09.090]    Collecting build traces ...',
  '[22:35:15.114] Route (app)                                 Size  First Load JS',
  '[22:35:15.125] ┌ ○ /                                      185 B         110 kB',
  '[22:35:15.125] ├ ○ /_not-found                            977 B         102 kB',
  '[22:35:15.125] ├ ƒ /api/pagespeed                         136 B         101 kB',
  '[22:35:15.126] ├ ○ /dashboard                           12.7 kB         117 kB',
  '[22:35:15.126] └ ○ /newProject                          42.7 kB         147 kB',
  '[22:35:15.126] + First Load JS shared by all             101 kB',
  '[22:35:15.126]   ├ chunks/4bd1b696-3b0868e7c18e7953.js  53.2 kB',
  '[22:35:15.126]   ├ chunks/684-986ae7b1cc107fcd.js       45.9 kB',
  '[22:35:15.126]   └ other shared chunks (total)          1.92 kB',
  '[22:35:15.126] ○  (Static)   prerendered as static content',
  '[22:35:15.127] ƒ  (Dynamic)  server-rendered on demand',
  '[22:35:15.238] Traced Next.js server files in: 66.647ms',
  '[22:35:15.376] Created all serverless functions in: 137.745ms',
  '[22:35:15.387] Collected static files (public/, static/, .next/static): 6.057ms',
  '[22:35:15.442] Build Completed in /vercel/output [23s]',
  '[22:35:15.514] Deploying outputs...',
  '[22:35:20.755] ',
  '[22:35:21.072] Deployment completed',
  '[22:35:34.171] Uploading build cache [166.80 MB]...',
  '[22:35:36.415] Build cache uploaded: 2.249s',
  '[22:35:38.674] Exiting build container',
  '[22:35:38.675] Build finished successfully',
];

export const jsonData: GetProjectId = {
  projectId: '1',
  github: 'https://github.com/Vanckoe/youtube-academy',
  domainName: 'youacademy.com.ua',
  frameworkPreset: 'Next.js',
  link: 'https://youtube-academy.vercel.app/',
  lastUpdated: '2025-05-19T14:00:00Z',
  securityLevel: 'Standart',
  functionCPU: {
    cpu: '0.6 vCPU',
    memory: '1 GB',
  },
  buildStatus: {
    state: 'Ready',
    errors: [],
  },
};
