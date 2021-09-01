find /home -mtime +7 -size +10k ! \( -name '*.zip' -o -name '*.rar' -o -name '*.tar' -o -name '*.bz2' \) | xargs bzip2
