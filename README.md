# Discord.js v14 Bot Altyapısı

Bu projede, **Discord.js v14** kullanılarak geliştirilmiş bir bot altyapısı bulunmaktadır. Bot, **MongoDB** ile entegre şekilde çalışır ve hem **slash komutlarını** hem de **prefix komutlarını** destekler. Proje, kullanıcı dostu bir yapıya sahip olup kolayca genişletilebilir.

## Özellikler

- **Discord.js v14** ile geliştirilmiş altyapı.
- **MongoDB** ile veri kaydetme ve yönetimi.
- **Slash komutları** ve **prefix komutları** desteği.
- Kolayca özelleştirilebilir ve genişletilebilir.
- **Event Handler** ve **Command Handler** sistemleri ile modüler yapı.

## Kurulum

### Gereksinimler

- Node.js (v20.17.0 LTS veya daha üstü)
- MongoDB bağlantısı (local ya da Atlas)
- Discord geliştirici portalından aldığınız bir bot token'i

### Adımlar

1. **Proje dosyalarını indirin**:

    ```bash
    git clone https://github.com/Papazchavo/v14-bos-altyapi
    cd repo-adi
    ```

2. **Gerekli modülleri yükleyin**:

    ```bash
    npm install
    ```

3. **Config.json dosyasını düzenleyin**:

    ```json
    {
      "mongoUrl": "",
      "token": "",
      "BotClientID": "",
      "prefix": ["."],
      "GuildID": "",
      "owners": [""],
      "BotDurum": [""], 
      "BotSesKanal": ""
    }
    ```

4. **Botu başlatın**:

    ```bash
    başlat.bat
    node papaz.js
    ```

Botunuz başarıyla çalışacaktır!

## Komutlar

### Slash Komutları

Slash komutlarını kullanarak botla etkileşime geçebilirsiniz. Örnek komutlar:

- `/ping` - Botun ping değerini gösterir.

### Prefix Komutları

Bot ayrıca prefix ile başlayan klasik komutları da destekler. Örneğin:

- `.ping` - Botun ping değerini gösterir.

## Yapı

- `src/Slashcommands/` - Slash komutları buraya eklenir.
- `src/commands/` - Prefix komutları buraya eklenir.
- `events/` - Discord.js eventleri buraya eklenir.
- `settings/schemas/` - MongoDB şemalarını buraya ekleyebilirsiniz.
- `config.json` - Botla ilgili ayarlar burada yer alır.

## MongoDB Kurulumu

Botun **MongoDB** ile çalışması için MongoDB veritabanını ayarlamanız gerekiyor. Eğer nasıl yapılacağını bilmiyorsanız, aşağıdaki videodan destek alabilirsiniz:

[MongoDB Kurulumu ve Kullanımı](https://www.youtube.com/watch?v=I2tdFbCOvP0&t=10s)

## Sunucu Bağlantı Resmi

Aşağıda botunuzun sunucu bağlantı resmi bulunmaktadır:

![Sunucu Bağlantı Resmi](https://media.discordapp.net/attachments/1157767204285190317/1290841104555446292/70FE1515-0896-4757-ABBD-51B34EF5678D.png?ex=66fdecf5&is=66fc9b75&hm=1d21d5392995ded45311e2728172352dbece451a6715ee3d2f82c7915ce86c7d&=&format=webp&quality=lossless&width=242&height=101)

## Yapımcılar

- **papazchavo.**
- **ancientxrd.**

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atabilirsiniz.
