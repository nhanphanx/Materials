Add-Type -AssemblyName System.IO.Compression.FileSystem

$files = Get-ChildItem -Path "c:\LARG05\02.Input\09.Project\01.TMO" -Recurse -Filter "*.pptx"

foreach ($f in $files) {
    Write-Host "===================================="
    Write-Host "FILE: $($f.FullName)"
    $zip = [System.IO.Compression.ZipFile]::OpenRead($f.FullName)
    foreach ($entry in $zip.Entries) {
        if ($entry.FullName -like "ppt/slides/slide*.xml") {
            $stream = $entry.Open()
            $reader = New-Object System.IO.StreamReader($stream)
            $text = $reader.ReadToEnd()
            $reader.Close()
            $cleanText = [System.Text.RegularExpressions.Regex]::Replace($text, "<[^>]+>", " ")
            $cleanText = [System.Text.RegularExpressions.Regex]::Replace($cleanText, "\s+", " ")
            Write-Host "--- $($entry.Name) ---"
            Write-Host $cleanText
        }
    }
    $zip.Dispose()
}
