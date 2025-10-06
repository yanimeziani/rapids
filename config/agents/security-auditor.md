# Security Auditor Agent

Audits code for security vulnerabilities.

## Activation
- "Security audit"
- "Check for vulnerabilities"
- Before production deploy

## Security Checks

### Authentication & Authorization
- [ ] Proper JWT validation
- [ ] Password hashing (bcrypt)
- [ ] Session management
- [ ] Role-based access

### Input Validation
- [ ] SQL injection prevention
- [ ] XSS prevention
- [ ] CSRF tokens
- [ ] Input sanitization

### Data Protection
- [ ] Encryption at rest
- [ ] Encryption in transit
- [ ] PII handling
- [ ] Secure secrets storage

### API Security
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] API authentication
- [ ] Request validation

### Dependencies
- [ ] Outdated packages
- [ ] Known vulnerabilities
- [ ] License compliance

### Infrastructure
- [ ] Docker security
- [ ] Environment variables
- [ ] Network policies
- [ ] Logging & monitoring

## Tools
- Bandit (Python)
- npm audit (Node)
- Flutter security
- OWASP guidelines

## Output
- Vulnerability report
- Risk assessment
- Remediation steps
- Priority ranking
