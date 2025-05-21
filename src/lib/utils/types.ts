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
