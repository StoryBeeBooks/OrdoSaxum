# PowerShell script to update all policy HTML files
# This script replaces hardcoded navbar and footer with placeholders

$policyFiles = @(
    "policies\cookie-policy.html",
    "policies\terms-of-use.html",
    "policies\accessibility.html",
    "policies\private-policy.html"
)

foreach ($file in $policyFiles) {
    Write-Host "Processing $file..."
    
    # Read the file
    $content = Get-Content $file -Raw
    
    # Replace navbar (find the nav tag and replace entire section until </nav>)
    $content = $content -replace '(?s)<nav class="navbar">.*?</nav>', '<div id="navbar-placeholder"></div>'
    
    # Replace footer (find the footer tag and replace entire section until </footer>)
    $content = $content -replace '(?s)<footer>.*?</footer>', '<div id="footer-placeholder"></div>'
    
    # Add components.js script if not already present
    if ($content -notmatch 'components\.js') {
        $content = $content -replace '(<link rel="stylesheet" href="\.\./css/policies\.css">)', '$1`n  <script src="../js/components.js"></script>'
    }
    
    # Write back to file
    $content | Set-Content $file -NoNewline
    
    Write-Host "Completed $file"
}

Write-Host "`nAll policy files have been updated!"
