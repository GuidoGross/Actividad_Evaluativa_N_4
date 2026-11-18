$ErrorActionPreference = "Stop"

chcp 65001 > $null
$utf8_encoding = New-Object System.Text.UTF8Encoding($false)
[Console]::InputEncoding = [Console]::OutputEncoding = $OutputEncoding = $utf8_encoding

$escape = [char]27
$bold = "$escape[1m"
${/bold} = "$escape[22m"
$italic = "$escape[3m"
${/italic} = "$escape[23m"
$reset_style = "$escape[0m"

function separator {
    $width = $Host.UI.RawUI.WindowSize.Width
    if ($null -eq $width) { $width = 125 }
    $separator = "${bold}/" + ("-" * ($width - 3)) + "/${reset_style}"
    Write-Host $separator -ForegroundColor White
}

function main {
    Set-Location -Path $PSScriptRoot
    Write-Host "${bold}${italic}Comenzando proceso de compilación y ejecución...${reset_style}" -ForegroundColor White
    separator
    compile_project
    execute_project
}

function compile_project {
    Write-Host "${bold}${italic}[1/2]${/italic} Compilando proyecto...${reset_style}" -ForegroundColor White
    $current_step_start_time = Get-Date
    npm run build
    $duration = (Get-Date) - $current_step_start_time
    Write-Host "${bold}Proyecto compilado en:${/bold} $($duration.TotalMilliseconds.ToString("N0", [cultureinfo]::GetCultureInfo("es-ES")))ms${reset_style}" -ForegroundColor Green
    separator
}

function execute_project {
    Write-Host "${bold}${italic}[2/2]${/italic} Ejecutando servidor de vista previa...${reset_style}" -ForegroundColor White
    Write-Host ""
    Write-Host "${bold}Pulse Ctrl + C para detener el servidor de vista previa en cualquier momento${reset_style}" -ForegroundColor Yellow
    npm run preview -- --open
}

main