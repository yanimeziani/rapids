/**
 * RAPIDS v4.0.0 - Core Type Definitions
 * Minimalist. Polyvalent. Efficient.
 */

// ============================================================================
// Agent Types
// ============================================================================

export interface AgentDefinition {
  name: string;
  description: string;
  type: 'general-purpose' | 'specialist';
  triggers: string[];
  instructions: string;
  context?: string[];
  model?: 'sonnet' | 'opus' | 'haiku';
  tools?: string[];
}

export interface AgentConfig {
  agents: Record<string, AgentDefinition>;
}

export interface AgentExecutionContext {
  workingDir: string;
  projectType?: ProjectType;
  stackConfig?: StackConfig;
}

// ============================================================================
// Project Types
// ============================================================================

export type ProjectType = 'full' | 'mobile' | 'web-backend' | 'backend' | 'unknown';

export type ProjectStructure = 'monorepo' | 'multi-folder' | 'single' | 'unknown';

export type PackageManager = 'npm' | 'yarn' | 'pnpm' | null;

export interface ProjectAnalysis {
  root: string;
  hasNextJs: boolean;
  hasFastAPI: boolean;
  hasFlutter: boolean;
  hasDocker: boolean;
  hasClaudeConfig: boolean;
  packageManager: PackageManager;
  structure: ProjectStructure;
  detectedFolders: {
    web?: string;
    backend?: string;
    mobile?: string;
  };
}

export interface ProjectMetadata {
  name: string;
  version: string;
  description?: string;
  repository?: string;
  website?: string;
}

// ============================================================================
// Stack Configuration
// ============================================================================

export interface StackConfig {
  project: ProjectMetadata;
  stack: {
    mobile?: MobileStackConfig;
    web?: WebStackConfig;
    backend?: BackendStackConfig;
    database?: DatabaseConfig;
    deployment?: DeploymentConfig;
  };
}

export interface MobileStackConfig {
  framework: 'Flutter';
  stateManagement: 'Riverpod' | 'Provider' | 'Bloc';
  routing: 'Go Router' | 'Auto Route';
  storage?: string;
}

export interface WebStackConfig {
  framework: 'Next.js' | 'React' | 'Vue';
  version?: string;
  styling?: string;
  auth?: string;
}

export interface BackendStackConfig {
  framework: 'FastAPI' | 'Django' | 'Express';
  orm?: string;
  auth?: string;
}

export interface DatabaseConfig {
  type: 'PostgreSQL' | 'MySQL' | 'SQLite' | 'MongoDB';
  version?: string;
  migrations?: string;
}

export interface DeploymentConfig {
  platform: 'Dokploy' | 'Vercel' | 'Railway' | 'Custom';
  docker?: boolean;
  ci?: string;
}

// ============================================================================
// MCP Server Configuration
// ============================================================================

export interface MCPServer {
  name: string;
  package: string;
  env?: Record<string, string>;
  args?: string[];
  disabled?: boolean;
}

export interface MCPConfig {
  mcpServers: Record<string, MCPServer>;
}

export interface MCPCredentials {
  dokployUrl?: string;
  dokployApiKey?: string;
  neonApiKey?: string;
  githubToken?: string;
}

// ============================================================================
// Command Types
// ============================================================================

export interface CommandDefinition {
  name: string;
  description: string;
  usage?: string;
  examples?: string[];
  handler: string;
}

export interface CommandContext {
  cwd: string;
  args: string[];
  flags: Record<string, any>;
}

// ============================================================================
// Template Types
// ============================================================================

export interface TemplateConfig {
  name: string;
  description: string;
  type: 'config' | 'project' | 'component';
  files: TemplateFile[];
  variables?: Record<string, TemplateVariable>;
}

export interface TemplateFile {
  path: string;
  content: string;
  condition?: string;
}

export interface TemplateVariable {
  name: string;
  type: 'string' | 'boolean' | 'choice';
  default?: any;
  choices?: string[];
  description?: string;
}

// ============================================================================
// Installation Types
// ============================================================================

export interface InstallationStep {
  id: string;
  name: string;
  duration: number;
}

export interface InstallationStats {
  agents: number;
  commands: number;
  templates: number;
  mcps?: number;
}

export interface InstallationStatus {
  phase: 'credentials' | 'installing' | 'success' | 'error';
  currentStep?: number;
  error?: string;
  stats?: InstallationStats;
}

// ============================================================================
// Cleanup Types
// ============================================================================

export interface CleanupItem {
  path: string;
  type: 'file' | 'directory';
  reason: string;
  size?: number;
}

export interface CleanupAnalysis {
  root: string;
  itemsToRemove: CleanupItem[];
  totalSize: number;
  hasClaudeConfig: boolean;
  hasMigrated: boolean;
}

// ============================================================================
// Configuration Management
// ============================================================================

export interface RapidsConfig {
  version: string;
  agents: AgentConfig;
  mcpServers: MCPConfig;
  stackConfig?: StackConfig;
  templates?: TemplateConfig[];
}

export interface UserConfig {
  preferences?: {
    defaultPackageManager?: PackageManager;
    defaultStack?: ProjectType;
    autoCleanup?: boolean;
  };
  credentials?: MCPCredentials;
}

// ============================================================================
// Utility Types
// ============================================================================

export type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  context?: Record<string, any>;
}

export interface ProgressUpdate {
  current: number;
  total: number;
  message?: string;
}
