DOWNLOAD_URL=$(curl -s https://api.github.com/repos/bbta3-bppt/aerobro/releases/latest \
        | grep browser_download_url \
        | grep aerobro \
        | cut -d '"' -f 4)
curl -s -L --create-dirs -o ~/www/aerobro/_work/aerobro/aerobro "$DOWNLOAD_URL"
