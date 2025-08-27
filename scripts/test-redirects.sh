#!/bin/bash

echo "Testing redirect configuration..."
echo "================================="

# Test URLs that were causing issues
test_urls=(
  "https://www.nyackscreenprinting.com"
  "https://www.nyackscreenprinting.com/orangetown"
  "https://www.nyackscreenprinting.com/pearl-river"
  "https://www.nyackscreenprinting.com/tarrytown"
  "https://www.nyackscreenprinting.com/valley-cottage"
  "https://www.nyackscreenprinting.com/montvale"
  "https://www.nyackscreenprinting.com/nanuet"
  "https://www.nyackscreenprinting.com/new-city"
  "https://rolleduptees.com"
  "https://www.rolleduptees.com"
)

for url in "${test_urls[@]}"; do
  echo "Testing: $url"
  curl -sL -w "Status: %{http_code} | Final URL: %{url_effective} | Redirects: %{num_redirects}\n" -o /dev/null "$url"
  echo "---"
done

echo "Test complete!"
echo ""
echo "Expected results:"
echo "- Status: 200"
echo "- Final URL: https://nyackscreenprinting.com/[path]"
echo "- Redirects: 1 (for www and old domain)"
echo "- Redirects: 0 (for direct nyackscreenprinting.com URLs)"
