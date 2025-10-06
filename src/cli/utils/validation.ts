/**
 * RAPIDS v4.0.0 - Input Validation Utilities
 */

/**
 * Validate project name
 */
export function validateProjectName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim() === '') {
    return { valid: false, error: 'Project name cannot be empty' };
  }

  if (!/^[a-zA-Z0-9-_]+$/.test(name)) {
    return {
      valid: false,
      error: 'Project name can only contain letters, numbers, hyphens, and underscores'
    };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Project name must be less than 100 characters' };
  }

  return { valid: true };
}

/**
 * Validate URL
 */
export function validateUrl(url: string): { valid: boolean; error?: string } {
  if (!url || url.trim() === '') {
    return { valid: false, error: 'URL cannot be empty' };
  }

  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate API key format
 */
export function validateApiKey(key: string, minLength: number = 10): { valid: boolean; error?: string } {
  if (!key || key.trim() === '') {
    return { valid: false, error: 'API key cannot be empty' };
  }

  if (key.length < minLength) {
    return { valid: false, error: `API key must be at least ${minLength} characters` };
  }

  return { valid: true };
}

/**
 * Sanitize user input
 */
export function sanitizeInput(input: string): string {
  return input.trim().replace(/[^\w\s-]/g, '');
}

/**
 * Validate email format
 */
export function validateEmail(email: string): { valid: boolean; error?: string } {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || email.trim() === '') {
    return { valid: false, error: 'Email cannot be empty' };
  }

  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
}

/**
 * Validate version string
 */
export function validateVersion(version: string): { valid: boolean; error?: string } {
  const versionRegex = /^\d+\.\d+\.\d+(-[a-zA-Z0-9]+)?$/;

  if (!version || version.trim() === '') {
    return { valid: false, error: 'Version cannot be empty' };
  }

  if (!versionRegex.test(version)) {
    return { valid: false, error: 'Invalid version format (expected: X.Y.Z or X.Y.Z-tag)' };
  }

  return { valid: true };
}
