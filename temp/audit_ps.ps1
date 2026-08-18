$ErrorActionPreference = 'SilentlyContinue'
$root = 'C:\Harmos\noorix_harmos_cockpit'

$files = Get-ChildItem -Path $root -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\(\.git|node_modules|__pycache__|backups)\\' }

$total = $files.Count
$bytes = ($files | Measure-Object Length -Sum).Sum
$mb = [math]::Round($bytes/1MB, 2)

$out = @()
$out += "# Project Audit Report"
$out += "Generated: $(Get-Date)"
$out += ""
$out += "## Totals"
$out += "- Files (excluding .git/node_modules/__pycache__/backups): $total"
$out += "- Total size MB: $mb"
$out += ""

$out += "## Largest 40 files"
$out += "``````"
$files | Sort-Object Length -Descending | Select-Object -First 40 | ForEach-Object {
    $out += ('{0:N2} MB  {1}' -f ($_.Length/1MB), $_.FullName.Replace($root,''))
}
$out += "``````"
$out += ""

$out += "## Duplicate basenames (same file name, multiple locations)"
$out += "``````"
$files | Group-Object Name | Where-Object { $_.Count -gt 1 } | Sort-Object Count -Descending | ForEach-Object {
    $out += ('{0} x{1}:' -f $_.Name, $_.Count)
    $_.Group | ForEach-Object { $out += ('   {0}' -f $_.FullName.Replace($root,'')) }
}
$out += "``````"
$out += ""

$out += "## Duplicate content (same MD5, different paths) - top groups"
$out += "``````"
$groups = $files | Get-FileHash -Algorithm MD5 | Group-Object Hash | Where-Object { $_.Count -gt 1 }
foreach ($g in ($groups | Sort-Object { $_.Group.Count } -Descending | Select-Object -First 60)) {
    $out += ('HASH {0} x{1}:' -f $g.Name, $g.Group.Count)
    foreach ($h in $g.Group) { $out += ('   {0}' -f $h.Path.Replace($root,'')) }
}
$out += "``````"
$out += ""

$out += "## Duplicate content group count: $($groups.Count)"
$out += ""

$out += "## Empty files (0 bytes)"
$out += "``````"
$files | Where-Object { $_.Length -eq 0 } | ForEach-Object { $out += $_.FullName.Replace($root,'') }
$out += "``````"

$report = Join-Path $root 'temp\audit_report.md'
$out | Out-File -FilePath $report -Encoding utf8
Write-Host "Report written to temp/audit_report.md"
Write-Host "Files: $total  SizeMB: $mb  DupContentGroups: $($groups.Count)"