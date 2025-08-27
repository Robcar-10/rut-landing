#!/bin/bash

echo "🧪 Testing Redirect Chains for GSC Issues"
echo "=========================================="

# Test problematic pages mentioned in GSC
test_urls=(
  "https://www.nyackscreenprinting.com/orangetown"
  "https://www.nyackscreenprinting.com/pearl-river"
  "https://www.nyackscreenprinting.com/tarrytown"
  "https://www.nyackscreenprinting.com/valley-cottage"
  "https://www.nyackscreenprinting.com/montvale"
  "https://www.nyackscreenprinting.com/nanuet"
  "https://www.nyackscreenprinting.com/new-city"
  "https://nyackscreenprinting.com/orangetown?fbclid=123456"
  "https://rolleduptees.com/pearl-river"
)

for url in "${test_urls[@]}"; do
  echo ""
  echo "Testing: $url"
  echo "------------------------"
  
  # Follow redirects and show the chain
  curl -sL -w "HTTP Status: %{http_code}\nFinal URL: %{url_effective}\nRedirect Count: %{num_redirects}\nTotal Time: %{time_total}s\n" \
       -o /dev/null "$url"
  
  echo "------------------------"
done

echo ""
echo "✅ Test Complete!"
echo ""
echo "Expected Results:"
echo "- HTTP Status: 200 (final page)"
echo "- Final URL: https://nyackscreenprinting.com/[location]"
echo "- Redirect Count: 1 (should be minimal)"
echo "- No redirect loops (ERR_TOO_MANY_REDIRECTS)"
