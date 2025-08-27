#!/bin/bash

echo "🔍 Testing redirect chains for nyackscreenprinting.com"
echo "=================================================="

# Test URLs that were causing issues
test_urls=(
  "https://www.nyackscreenprinting.com/"
  "https://www.nyackscreenprinting.com/orangetown"
  "https://www.nyackscreenprinting.com/pearl-river"
  "https://www.nyackscreenprinting.com/tarrytown"
  "https://rolleduptees.com/"
  "https://www.rolleduptees.com/orangetown"
)

for url in "${test_urls[@]}"; do
  echo ""
  echo "Testing: $url"
  echo "----------------------------------------"
  
  # Test with curl
  response=$(curl -sL -w "HTTP Status: %{http_code}\nFinal URL: %{url_effective}\nRedirect Count: %{num_redirects}\nTotal Time: %{time_total}s\n" -o /dev/null "$url")
  
  echo "$response"
  
  # Check if redirect count is reasonable (should be 1 for most cases)
  redirect_count=$(echo "$response" | grep "Redirect Count:" | cut -d' ' -f3)
  if [ "$redirect_count" -gt 3 ]; then
    echo "⚠️  WARNING: Too many redirects ($redirect_count)"
  elif [ "$redirect_count" -eq 1 ]; then
    echo "✅ Good: Single redirect"
  elif [ "$redirect_count" -eq 0 ]; then
    echo "✅ Perfect: No redirects needed"
  fi
done

echo ""
echo "🏁 Test completed!"
echo "Expected behavior:"
echo "- www.nyackscreenprinting.com → nyackscreenprinting.com (1 redirect)"
echo "- rolleduptees.com → nyackscreenprinting.com (1 redirect)"
echo "- All final URLs should be https://nyackscreenprinting.com/..."
