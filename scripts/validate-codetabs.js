#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Define the required languages for complete support
const REQUIRED_LANGUAGES = ['curl', 'javascript', 'python', 'php', 'go', 'java', 'csharp', 'ruby'];

// API documentation directories to check
const API_DOCS_DIRS = [
  'docs/api/client',
  'docs/api/application',
  'docs/api'
];

/**
 * Validate CodeTabs implementation across API documentation
 */
class CodeTabsValidator {
  constructor() {
    this.results = {
      totalFiles: 0,
      filesWithCodeTabs: 0,
      filesWithManualTabs: 0,
      totalEndpoints: 0,
      endpointsWithFullLanguageSupport: 0,
      issues: [],
      summary: {}
    };
  }

  /**
   * Main validation function
   */
  async validate() {
    console.log('🔍 Validating CodeTabs implementation...\n');

    for (const dir of API_DOCS_DIRS) {
      if (fs.existsSync(dir)) {
        await this.validateDirectory(dir);
      }
    }

    this.generateReport();
  }

  /**
   * Validate all .md files in a directory
   */
  async validateDirectory(dirPath) {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const fullPath = path.join(dirPath, file.name);
      
      if (file.isDirectory()) {
        await this.validateDirectory(fullPath);
      } else if (file.name.endsWith('.md')) {
        await this.validateFile(fullPath);
      }
    }
  }

  /**
   * Validate individual markdown file
   */
  async validateFile(filePath) {
    this.results.totalFiles++;
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(process.cwd(), filePath);

    console.log(`📄 Checking: ${relativePath}`);

    // Check for CodeTabs import
    const hasCodeTabsImport = /import CodeTabs from ['"]@site\/src\/components\/CodeTabs['"]/.test(content);
    const hasManualTabsImport = /import Tabs from ['"]@theme\/Tabs['"]/.test(content);

    if (hasManualTabsImport && !hasCodeTabsImport) {
      this.results.issues.push({
        file: relativePath,
        type: 'import_issue',
        message: 'Still uses manual Tabs import instead of CodeTabs'
      });
    }

    // Find CodeTabs usage
    const codeTabsMatches = content.match(/<CodeTabs[\s\S]*?\/>/g) || [];
    const manualTabsMatches = content.match(/<Tabs>[\s\S]*?<\/Tabs>/g) || [];

    this.results.filesWithCodeTabs += codeTabsMatches.length > 0 ? 1 : 0;
    this.results.filesWithManualTabs += manualTabsMatches.length > 0 ? 1 : 0;

    // Validate CodeTabs examples
    for (const codeTabsMatch of codeTabsMatches) {
      this.validateCodeTabsExample(codeTabsMatch, relativePath);
    }

    // Check for remaining manual tabs
    if (manualTabsMatches.length > 0) {
      this.results.issues.push({
        file: relativePath,
        type: 'manual_tabs',
        message: `Found ${manualTabsMatches.length} manual Tabs sections that need conversion`,
        count: manualTabsMatches.length
      });
    }

    console.log(`  ✅ CodeTabs: ${codeTabsMatches.length}, ❌ Manual Tabs: ${manualTabsMatches.length}`);
  }

  /**
   * Validate individual CodeTabs example
   */
  validateCodeTabsExample(codeTabsContent, filePath) {
    this.results.totalEndpoints++;

    // Extract endpoint and method
    const endpointMatch = codeTabsContent.match(/endpoint="([^"]+)"/);
    const methodMatch = codeTabsContent.match(/method="([^"]+)"/);
    
    const endpoint = endpointMatch ? endpointMatch[1] : 'unknown';
    const method = methodMatch ? methodMatch[1] : 'unknown';

    // Extract examples object
    const examplesMatch = codeTabsContent.match(/examples=\{\{([\s\S]*?)\}\}/);
    if (!examplesMatch) {
      this.results.issues.push({
        file: filePath,
        type: 'missing_examples',
        endpoint: `${method} ${endpoint}`,
        message: 'CodeTabs found but no examples object'
      });
      return;
    }

    // Check for each required language
    const examplesContent = examplesMatch[1];
    const foundLanguages = [];
    const missingLanguages = [];

    for (const lang of REQUIRED_LANGUAGES) {
      const langRegex = new RegExp(`${lang}:\\s*\``, 'i');
      if (langRegex.test(examplesContent)) {
        foundLanguages.push(lang);
      } else {
        missingLanguages.push(lang);
      }
    }

    if (foundLanguages.length === REQUIRED_LANGUAGES.length) {
      this.results.endpointsWithFullLanguageSupport++;
    } else {
      this.results.issues.push({
        file: filePath,
        type: 'incomplete_languages',
        endpoint: `${method} ${endpoint}`,
        found: foundLanguages,
        missing: missingLanguages,
        message: `Missing ${missingLanguages.length}/${REQUIRED_LANGUAGES.length} languages: ${missingLanguages.join(', ')}`
      });
    }
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    console.log('\n📊 VALIDATION REPORT\n');
    console.log('='.repeat(80));

    // Summary stats
    console.log(`📁 Total Files Checked: ${this.results.totalFiles}`);
    console.log(`✅ Files with CodeTabs: ${this.results.filesWithCodeTabs}`);
    console.log(`❌ Files with Manual Tabs: ${this.results.filesWithManualTabs}`);
    console.log(`🔗 Total API Endpoints: ${this.results.totalEndpoints}`);
    console.log(`🌍 Endpoints with Full Language Support: ${this.results.endpointsWithFullLanguageSupport}`);
    
    const languageCoverage = this.results.totalEndpoints > 0 
      ? ((this.results.endpointsWithFullLanguageSupport / this.results.totalEndpoints) * 100).toFixed(1)
      : 0;
    console.log(`📈 Language Coverage: ${languageCoverage}%`);

    // Issues breakdown
    console.log('\n🔧 ISSUES FOUND\n');
    console.log('-'.repeat(80));

    const issuesByType = this.results.issues.reduce((acc, issue) => {
      acc[issue.type] = (acc[issue.type] || 0) + 1;
      return acc;
    }, {});

    for (const [type, count] of Object.entries(issuesByType)) {
      console.log(`${type.replace(/_/g, ' ').toUpperCase()}: ${count} issues`);
    }

    // Detailed issues
    if (this.results.issues.length > 0) {
      console.log('\n📋 DETAILED ISSUES\n');
      console.log('-'.repeat(80));

      for (const issue of this.results.issues) {
        console.log(`\n📄 ${issue.file}`);
        console.log(`   ${issue.endpoint ? `🔗 ${issue.endpoint}` : ''}`);
        console.log(`   ⚠️  ${issue.message}`);
        if (issue.missing && issue.missing.length > 0) {
          console.log(`   🚫 Missing: ${issue.missing.join(', ')}`);
        }
      }
    }

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS\n');
    console.log('-'.repeat(80));

    if (this.results.filesWithManualTabs > 0) {
      console.log('1. Convert remaining manual Tabs to CodeTabs component');
    }

    const incompleteEndpoints = this.results.totalEndpoints - this.results.endpointsWithFullLanguageSupport;
    if (incompleteEndpoints > 0) {
      console.log(`2. Add missing language examples to ${incompleteEndpoints} endpoints`);
    }

    if (this.results.issues.some(i => i.type === 'import_issue')) {
      console.log('3. Update import statements to use CodeTabs component');
    }

    console.log('\n🎯 TARGET: 100% of API endpoints should have all 8 languages (cURL, JS, Python, PHP, Go, Java, C#, Ruby)');
    
    // Exit with appropriate code
    const hasErrors = this.results.issues.length > 0;
    if (hasErrors) {
      console.log('\n❌ Validation completed with issues');
      process.exit(1);
    } else {
      console.log('\n✅ All validations passed!');
      process.exit(0);
    }
  }
}

// Run validation
const validator = new CodeTabsValidator();
validator.validate().catch(console.error); 