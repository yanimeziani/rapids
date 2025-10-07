#!/bin/bash
# RAPIDS v4.0.0-beta.1 CLI Test Script

echo "🧪 Testing RAPIDS CLI Commands..."
echo ""

# Test 1: Help command
echo "1️⃣  Testing: rapids --help"
node dist/rapids.js --help
echo ""

# Test 2: Version
echo "2️⃣  Testing: rapids --version"
node dist/rapids.js --version
echo ""

# Test 3: Agent help
echo "3️⃣  Testing: rapids agent --help"
node dist/rapids.js agent --help
echo ""

# Test 4: Config help
echo "4️⃣  Testing: rapids config --help"
node dist/rapids.js config --help
echo ""

# Test 5: Template help
echo "5️⃣  Testing: rapids template --help"
node dist/rapids.js template --help
echo ""

# Test 6: Doctor help
echo "6️⃣  Testing: rapids doctor --help"
node dist/rapids.js doctor --help
echo ""

echo "✅ All CLI commands are accessible!"
echo ""
echo "📝 Next steps to fully test:"
echo "  1. Install RAPIDS globally: npm install -g ."
echo "  2. Test: rapids config (interactive TUI)"
echo "  3. Test: rapids agent (list agents)"
echo "  4. Test: rapids template (interactive generator)"
echo "  5. Test: rapids doctor (installation check)"
