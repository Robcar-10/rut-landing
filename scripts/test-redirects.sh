#!/bin/bash

echo "Testing redirect configuration..."
echo "================================="

# Test www to non-www redirect
echo "1. Testing www.nyackscreenprinting.com -> nyackscreenprinting.com"
curl -sL -w "Status: %{http_code} | Redirects: %{num_redirects} | Final URL: %{url_effective}\n" -o /dev/null "https://www.nyackscreenprinting.com/"

echo ""

# Test old domain redirects
echo "2. Testing rolleduptees.com -> nyackscreenprinting.com"
curl -sL -w "Status: %{http_code} | Redirects: %{num_redirects} | Final URL: %{url_effective}\n" -o /dev/null "https://rolleduptees.com/"

echo ""

echo "3. Testing www.rolleduptees.com -> nyackscreenprinting.com"
curl -sL -w "Status: %{http_code} | Redirects: %{num_redirects} | Final URL: %{url_effective}\n" -o /dev/null "https://www.rolleduptees.com/"

echo ""

# Test location pages
echo "4. Testing location page: /orangetown"
curl -sL -w "Status: %{http_code} | Redirects: %{num_redirects} | Final URL: %{url_effective}\n" -o /dev/null "https://www.nyackscreenprinting.com/orangetown"

echo ""

echo "5. Testing service page: /services/screen-printing"
curl -sL -w "Status: %{http_code} | Redirects: %{num_redirects} | Final URL: %{url_effective}\n" -o /dev/null "https://www.nyackscreenprinting.com/services/screen-printing"

echo ""

# Test URLs that were causing issues
test_urls=(
  "https://www.nyackscreenprinting.com/orangetown"
  "https://www.nyackscreenprinting.com/pearl-river"
  "https://www.nyackscreenprinting.com/tarrytown"
  "https://www.nyackscreenprinting.com/valley-cottage"
  "https://www.nyackscreenprinting.com/montvale"
  "https://www.nyackscreenprinting.com/nanuet"
  "https://www.nyackscreenprinting.com/new-city"
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
echo "- Final URL should be https://nyackscreenprinting.com/..."
echo "- Redirects: 1 (for www -> non-www)"
echo "- Redirects: 0 (for direct nyackscreenprinting.com URLs)"
