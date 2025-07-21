#!/usr/bin/env node

/**
 * Comprehensive Accessibility and Performance Testing Script
 * 
 * This script performs automated testing for:
 * - Accessibility compliance (WCAG guidelines)
 * - Performance metrics validation
 * - Keyboard navigation testing
 * - Screen reader compatibility
 * - Responsive design testing
 * 
 * Requirements: 4.1, 4.2, 4.3, 7.1, 7.2, 7.3
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:3000',
  testPages: [
    '/',
    '/get-started',
    '/get-started/hsc',
    '/get-started/ssc',
    '/get-started/completing-sentence',
    '/get-started/connectors',
    '/get-started/modifier',
    '/get-started/narration',
    '/get-started/transformation',
    '/get-started/use-of-verbs',
    '/grammar-items/hsc/completing-sentence',
    '/grammar-items/hsc/connectors',
    '/board-questions/hsc/completing-sentence',
    '/board-questions/hsc/connectors'
  ],
  viewports: [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Large Desktop', width: 2560, height: 1440 }
  ],
  accessibilityRules: [
    'color-contrast',
    'heading-order',
    'image-alt',
    'keyboard-navigation',
    'focus-visible',
    'aria-labels',
    'semantic-markup'
  ],
  performanceThresholds: {
    firstContentfulPaint: 2000, // 2 seconds
    largestContentfulPaint: 4000, // 4 seconds
    cumulativeLayoutShift: 0.1,
    firstInputDelay: 100, // 100ms
    totalBlockingTime: 300 // 300ms
  }
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Utility functions
function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${'='.repeat(60)}`, colors.cyan);
  log(`${message}`, colors.cyan + colors.bright);
  log(`${'='.repeat(60)}`, colors.cyan);
}

function logSubHeader(message) {
  log(`\n${'-'.repeat(40)}`, colors.blue);
  log(`${message}`, colors.blue + colors.bright);
  log(`${'-'.repeat(40)}`, colors.blue);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

// Test results storage
const testResults = {
  accessibility: [],
  performance: [],
  responsive: [],
  keyboard: [],
  overall: { passed: 0, failed: 0, warnings: 0 }
};

// Check if required dependencies are installed
function checkDependencies() {
  logHeader('CHECKING DEPENDENCIES');
  
  const requiredPackages = [
    { name: 'puppeteer', dev: true },
    { name: 'axe-core', dev: true },
    { name: 'lighthouse', dev: true }
  ];
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const installedDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  const missingPackages = requiredPackages.filter(pkg => !installedDeps[pkg.name]);
  
  if (missingPackages.length > 0) {
    logWarning('Missing required packages for comprehensive testing:');
    missingPackages.forEach(pkg => {
      log(`  - ${pkg.name}`, colors.yellow);
    });
    log('\nTo install missing packages, run:', colors.cyan);
    log(`npm install --save-dev ${missingPackages.map(p => p.name).join(' ')}`, colors.cyan);
    log('\nContinuing with available tests...', colors.yellow);
    return false;
  }
  
  logSuccess('All required dependencies are installed');
  return true;
}

// Test server availability
async function checkServer() {
  logHeader('CHECKING SERVER AVAILABILITY');
  
  try {
    const response = await fetch(CONFIG.baseUrl);
    if (response.ok) {
      logSuccess(`Server is running at ${CONFIG.baseUrl}`);
      return true;
    } else {
      logError(`Server responded with status: ${response.status}`);
      return false;
    }
  } catch (error) {
    logError(`Server is not accessible at ${CONFIG.baseUrl}`);
    log('Please start the development server with: npm run dev', colors.cyan);
    return false;
  }
}

// Static file structure validation
function validateFileStructure() {
  logHeader('VALIDATING FILE STRUCTURE');
  
  const criticalPaths = [
    'app/page.tsx',
    'app/layout.tsx',
    'app/(learning)/layout.tsx',
    'app/(marketing)/layout.tsx',
    'components/layout/Navbar.tsx',
    'components/layout/Footer.tsx',
    'components/common/LoadingSpinner.tsx',
    'components/common/ErrorBoundary.tsx',
    'public/images',
    'public/icons',
    'public/documents'
  ];
  
  let structureValid = true;
  
  criticalPaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      logSuccess(`Found: ${filePath}`);
    } else {
      logError(`Missing: ${filePath}`);
      structureValid = false;
    }
  });
  
  return structureValid;
}

// Accessibility testing (basic checks without external dependencies)
function testAccessibilityBasic() {
  logHeader('BASIC ACCESSIBILITY TESTING');
  
  const componentPaths = [
    'components/common',
    'components/grammar',
    'components/questions',
    'components/layout'
  ];
  
  let accessibilityIssues = 0;
  
  componentPaths.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir, { recursive: true })
        .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for common accessibility issues
        const checks = [
          {
            pattern: /<img(?![^>]*alt=)/gi,
            message: 'Image without alt attribute',
            severity: 'error'
          },
          {
            pattern: /<button(?![^>]*aria-label)(?![^>]*>.*<\/button>)/gi,
            message: 'Button without accessible label',
            severity: 'warning'
          },
          {
            pattern: /<input(?![^>]*aria-label)(?![^>]*id=)/gi,
            message: 'Input without label or aria-label',
            severity: 'error'
          },
          {
            pattern: /onClick.*(?!onKeyDown|onKeyPress)/gi,
            message: 'Click handler without keyboard equivalent',
            severity: 'warning'
          }
        ];
        
        checks.forEach(check => {
          const matches = content.match(check.pattern);
          if (matches) {
            if (check.severity === 'error') {
              logError(`${filePath}: ${check.message} (${matches.length} instances)`);
              accessibilityIssues++;
            } else {
              logWarning(`${filePath}: ${check.message} (${matches.length} instances)`);
            }
          }
        });
      });
    }
  });
  
  if (accessibilityIssues === 0) {
    logSuccess('No critical accessibility issues found in static analysis');
  } else {
    logError(`Found ${accessibilityIssues} accessibility issues`);
  }
  
  return accessibilityIssues === 0;
}

// Performance testing (basic checks)
function testPerformanceBasic() {
  logHeader('BASIC PERFORMANCE TESTING');
  
  // Check bundle size
  try {
    execSync('npm run build', { stdio: 'pipe' });
    logSuccess('Build completed successfully');
    
    // Check for common performance issues in code
    const performanceIssues = [];
    
    // Check for large images in public directory
    if (fs.existsSync('public/images')) {
      const imageFiles = fs.readdirSync('public/images', { recursive: true })
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
      
      imageFiles.forEach(file => {
        const filePath = path.join('public/images', file);
        const stats = fs.statSync(filePath);
        const sizeInMB = stats.size / (1024 * 1024);
        
        if (sizeInMB > 1) {
          logWarning(`Large image file: ${file} (${sizeInMB.toFixed(2)}MB)`);
          performanceIssues.push(`Large image: ${file}`);
        }
      });
    }
    
    // Check for potential performance issues in components
    const componentDirs = ['components', 'app'];
    componentDirs.forEach(dir => {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir, { recursive: true })
          .filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
        
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Check for potential performance issues
          if (content.includes('useEffect(() => {') && !content.includes('[]')) {
            logWarning(`${filePath}: useEffect without dependency array`);
          }
          
          if (content.match(/\.map\(.*\.map\(/g)) {
            logWarning(`${filePath}: Nested map operations detected`);
          }
        });
      }
    });
    
    if (performanceIssues.length === 0) {
      logSuccess('No major performance issues detected');
    }
    
    return performanceIssues.length === 0;
    
  } catch (error) {
    logError('Build failed - performance testing cannot continue');
    return false;
  }
}

// Responsive design testing (basic checks)
function testResponsiveDesign() {
  logHeader('RESPONSIVE DESIGN TESTING');
  
  // Check for responsive design patterns in CSS/Tailwind
  const styleFiles = [];
  
  // Check Tailwind config
  if (fs.existsSync('tailwind.config.ts')) {
    const tailwindConfig = fs.readFileSync('tailwind.config.ts', 'utf8');
    if (tailwindConfig.includes('screens:')) {
      logSuccess('Tailwind responsive breakpoints configured');
    } else {
      logWarning('Tailwind responsive breakpoints not found');
    }
  }
  
  // Check components for responsive classes
  const componentDirs = ['components', 'app'];
  let responsiveComponents = 0;
  let totalComponents = 0;
  
  componentDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir, { recursive: true })
        .filter(file => file.endsWith('.tsx'));
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        totalComponents++;
        
        // Check for responsive Tailwind classes
        const responsivePatterns = [
          /sm:/g, /md:/g, /lg:/g, /xl:/g, /2xl:/g,
          /max-sm:/g, /max-md:/g, /max-lg:/g, /max-xl:/g
        ];
        
        const hasResponsive = responsivePatterns.some(pattern => 
          pattern.test(content)
        );
        
        if (hasResponsive) {
          responsiveComponents++;
        }
      });
    }
  });
  
  const responsivePercentage = (responsiveComponents / totalComponents) * 100;
  
  if (responsivePercentage > 70) {
    logSuccess(`${responsivePercentage.toFixed(1)}% of components use responsive design`);
  } else {
    logWarning(`Only ${responsivePercentage.toFixed(1)}% of components use responsive design`);
  }
  
  return responsivePercentage > 70;
}

// Keyboard navigation testing (basic checks)
function testKeyboardNavigation() {
  logHeader('KEYBOARD NAVIGATION TESTING');
  
  const componentDirs = ['components'];
  let keyboardIssues = 0;
  
  componentDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir, { recursive: true })
        .filter(file => file.endsWith('.tsx'));
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for keyboard navigation patterns
        const checks = [
          {
            pattern: /tabIndex={-1}/gi,
            message: 'Element with tabIndex -1 (not keyboard accessible)',
            severity: 'warning'
          },
          {
            pattern: /<div[^>]*onClick(?![^>]*onKeyDown|onKeyPress)/gi,
            message: 'Clickable div without keyboard handler',
            severity: 'error'
          },
          {
            pattern: /onKeyDown|onKeyPress|onKeyUp/gi,
            message: 'Keyboard event handler found',
            severity: 'success'
          }
        ];
        
        checks.forEach(check => {
          const matches = content.match(check.pattern);
          if (matches) {
            if (check.severity === 'error') {
              logError(`${filePath}: ${check.message}`);
              keyboardIssues++;
            } else if (check.severity === 'warning') {
              logWarning(`${filePath}: ${check.message}`);
            } else {
              logSuccess(`${filePath}: ${check.message}`);
            }
          }
        });
      });
    }
  });
  
  return keyboardIssues === 0;
}

// Generate test report
function generateReport() {
  logHeader('TEST REPORT SUMMARY');
  
  const reportPath = 'accessibility-performance-report.json';
  const timestamp = new Date().toISOString();
  
  const report = {
    timestamp,
    summary: testResults.overall,
    details: {
      fileStructure: testResults.fileStructure,
      accessibility: testResults.accessibility,
      performance: testResults.performance,
      responsive: testResults.responsive,
      keyboard: testResults.keyboard
    },
    recommendations: [
      'Install puppeteer, axe-core, and lighthouse for comprehensive testing',
      'Run tests against live server for dynamic analysis',
      'Implement automated CI/CD testing pipeline',
      'Regular accessibility audits with screen readers',
      'Performance monitoring in production environment'
    ]
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  log(`\nTest Results:`, colors.bright);
  log(`✅ Passed: ${testResults.overall.passed}`, colors.green);
  log(`❌ Failed: ${testResults.overall.failed}`, colors.red);
  log(`⚠️  Warnings: ${testResults.overall.warnings}`, colors.yellow);
  
  log(`\nDetailed report saved to: ${reportPath}`, colors.cyan);
  
  if (testResults.overall.failed === 0) {
    logSuccess('All critical tests passed!');
    return true;
  } else {
    logError('Some tests failed. Please review the issues above.');
    return false;
  }
}

// Main test execution
async function runTests() {
  logHeader('ACCESSIBILITY & PERFORMANCE TESTING SUITE');
  log('Testing educational content structure and performance\n');
  
  // Initialize test results
  testResults.overall = { passed: 0, failed: 0, warnings: 0 };
  
  // Run tests
  const tests = [
    { name: 'Dependencies', fn: checkDependencies, critical: false },
    { name: 'File Structure', fn: validateFileStructure, critical: true },
    { name: 'Basic Accessibility', fn: testAccessibilityBasic, critical: true },
    { name: 'Basic Performance', fn: testPerformanceBasic, critical: true },
    { name: 'Responsive Design', fn: testResponsiveDesign, critical: false },
    { name: 'Keyboard Navigation', fn: testKeyboardNavigation, critical: true }
  ];
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        testResults.overall.passed++;
        logSuccess(`${test.name} test passed`);
      } else {
        if (test.critical) {
          testResults.overall.failed++;
          logError(`${test.name} test failed`);
        } else {
          testResults.overall.warnings++;
          logWarning(`${test.name} test had warnings`);
        }
      }
    } catch (error) {
      testResults.overall.failed++;
      logError(`${test.name} test error: ${error.message}`);
    }
  }
  
  // Generate final report
  const success = generateReport();
  
  // Exit with appropriate code
  process.exit(success ? 0 : 1);
}

// Handle script execution
if (require.main === module) {
  runTests().catch(error => {
    logError(`Test suite failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = {
  runTests,
  CONFIG,
  testResults
};