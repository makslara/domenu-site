# DoMenu — публичные страницы

Лендинг и обязательные для сторов страницы приложения DoMenu.

Сейчас раздаётся GitHub Pages: https://makslara.github.io/domenu-site/

## Структура

| Путь | Что это |
|---|---|
| `/` | лендинг, английский |
| `/ru/` | лендинг, русский |
| `/support/` | поддержка и FAQ (Support URL в App Store и Play) |
| `/privacy/` | политика конфиденциальности |
| `/terms/` | условия использования (EULA, ссылка обязательна в описании из-за подписки) |
| `/delete-account/` | как удалить аккаунт (требование Play) |
| `/join/` | страница приглашения в семью, `noindex`, из поиска и меню не видна |

Лендинг: `landing.css` + `landing.js`, кадры экранов — `shots/<язык>/`, фото блюд для колоды метча — `shots/deck/`.
Документы: `style.css`.

**Все ссылки относительные** — сайт одинаково работает и в подпапке (`/domenu-site/` на GitHub Pages), и в корне домена (Cloudflare Pages). Абсолютных путей вида `/domenu-site/...` быть не должно.

## Язык

Английская версия — основная (`/`), русская — `/ru/`. Первый заход русскоязычного браузера перебрасывается на `/ru/`; выбор из переключателя запоминается в `localStorage` под ключом `domenu-lang` и дальше редирект не срабатывает.

Тексты обеих версий живут в двух отдельных файлах: правка смысла вносится в оба.

## Кадры экранов

Снимаются в основном репозитории (`app/integration_test/screenshots_test.dart`, симулятор «DoMenu shots 16PM», 1320×2868), затем ужимаются до ширины 660 и переводятся в WebP:

```sh
sips -Z 1434 app/screenshots/<lang>/<name>.png --out /tmp/<name>.png
cwebp -q 82 /tmp/<name>.png -o shots/<lang>/<name>.webp
```

`og.png` (1200×630) и `apple-touch-icon.png` рисуются скриптом на Pillow из знака и кадра `03-today`.

## Форма «сообщить о запуске»

Пока без бэкенда: `SIGNUP_ENDPOINT` в `landing.js` пустой, и кнопка открывает письмо на `studiosernik@gmail.com`. Как только появится приёмник (Formspree, Cloudflare Worker, что угодно принимающее JSON `{email, lang, source}`) — вписать его URL в ту же константу, больше ничего менять не нужно.

## Публикация

GitHub Pages — из ветки `main`, корень. Cloudflare Pages подключается к этому же репозиторию: framework preset «None», build command пустой, output directory `/`.
