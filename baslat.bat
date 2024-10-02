@echo off
:: Kırmızı renk ayarı (Arka plan siyah, yazı rengi kırmızı)
color 04

:: Başlık
title Bot Başlatma

:: Modül kurulumları
echo [INFO] Gerekli modüller yükleniyor...
npm install

:: Modül kurulum tamamlandıysa botu başlat
if %errorlevel% == 0 (
    echo [INFO] Modüller başarıyla kuruldu!
    echo [INFO] Bot başlatılıyor...
    node .
) else (
    echo [ERROR] Modüller yüklenemedi! Hata kodu: %errorlevel%
    pause
    exit /b %errorlevel%
)

:: Başlatma işlemi bittiğinde terminali açık bırakmak
pause
