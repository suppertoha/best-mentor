# Аудио и видео

HTML5 позволяет встраивать аудио и видео без Flash. Браузер показывает встроенный плеер, а ты контролируешь источники, субтитры и поведение воспроизведения.

## Видео с тегом video

Атрибут `controls` добавляет стандартные кнопки управления. `poster` — картинка до старта воспроизведения.

```html
<video
  controls
  width="640"
  height="360"
  poster="preview.jpg"
>
  <source src="lesson.mp4" type="video/mp4" />
  <source src="lesson.webm" type="video/webm" />
  Ваш браузер не поддерживает видео HTML5.
</video>
```

## Аудио с тегом audio

Для подкастов и звуковых эффектов используй `<audio>`. Можно отключить автозагрузку через `preload="none"`.

```html
<audio controls preload="metadata">
  <source src="intro.ogg" type="audio/ogg" />
  <source src="intro.mp3" type="audio/mpeg" />
  Аудио недоступно в этом браузере.
</audio>
```

## Субтитры и дорожки

Внутри `<video>` элемент `<track>` подключает субтитры. Атрибут `kind` указывает тип дорожки.

```html
<video controls>
  <source src="talk.mp4" type="video/mp4" />
  <track
    kind="subtitles"
    src="talk-ru.vtt"
    srclang="ru"
    label="Русские субтитры"
    default
  />
</video>
```

## Атрибуты воспроизведения

Частые флаги: `autoplay`, `muted`, `loop`, `playsinline`. Автовоспроизведение в большинстве браузеров работает только с отключённым звуком.

```html
<video muted autoplay loop playsinline>
  <source src="background.webm" type="video/webm" />
</video>
```

| Атрибут | Назначение |
| --- | --- |
| controls | Показать элементы управления |
| poster | Превью-изображение для video |
| preload | Подсказка браузеру: none | metadata | auto |
| muted | Без звука (нужен для autoplay) |
| loop | Повторять после окончания |

Для продакшена добавляй несколько форматов и субтитры — так контент доступен на разных устройствах и для большей аудитории.
