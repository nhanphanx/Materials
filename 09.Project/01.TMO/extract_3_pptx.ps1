Add-Type -AssemblyName System.IO.Compression.FileSystem

$targetFiles = @(
    "c:\LARG05\02.Input\09.Project\01.TMO\Các kỹ thuật test.pptx",
    "c:\LARG05\02.Input\09.Project\01.TMO\kỹ thuật test hộp đen.pptx",
    "c:\LARG05\02.Input\09.Project\01.TMO\Lý thuyết chung về test.pptx"
)

foreach ($path in $targetFiles) {
    Write-Host "===================================="
    Write-Host "FILE: $path"
    if (Test-Path $path) {
        $zip = [System.IO.Compression.ZipFile]::OpenRead($path)
        foreach ($entry in $zip.Entries | Sort-Object Name) {
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
    } else {
        Write-Host "NOT FOUND: $path"
    }
}
