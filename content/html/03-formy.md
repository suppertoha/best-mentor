# Формы в HTML

**Форма** — способ собрать данные от пользователя и отправить их на сервер (логин, регистрация, поиск, заказ).

## Базовая форма

```html
<form action="/api/auth/login" method="post">
  <label for="email">Email</label>
  <input id="email" type="email" name="email" required />

  <label for="password">Пароль</label>
  <input id="password" type="password" name="password" required />

  <button type="submit">Войти</button>
</form>
```

| Атрибут | Значение |
| ------- | -------- |
| `action` | URL, куда уйдут данные |
| `method` | `get` или `post` |
| `name` | имя поля в запросе |
| `required` | поле обязательно |

## Связь label и input

`for` у `label` совпадает с `id` у `input` — по клику на подпись фокус попадает в поле. Это удобно и правильно для доступности.

## Типы input

```html
<input type="text" name="username" placeholder="Логин" />
<input type="email" name="email" />
<input type="password" name="password" />
<input type="number" name="age" min="1" max="120" />
<input type="checkbox" name="agree" />
<input type="radio" name="plan" value="free" />
<input type="radio" name="plan" value="pro" />
```

## textarea и select

```html
<label for="bio">О себе</label>
<textarea id="bio" name="bio" rows="4" placeholder="Коротко о себе"></textarea>

<label for="role">Роль</label>
<select id="role" name="role">
  <option value="student">Студент</option>
  <option value="admin">Админ</option>
</select>
```

## Кнопки

```html
<button type="submit">Отправить</button>
<button type="reset">Сбросить</button>
<button type="button">Просто кнопка (без отправки)</button>
```

## Пример: регистрация (упрощённо)

```html
<form action="/api/auth/register" method="post">
  <fieldset>
    <legend>Регистрация</legend>

    <label for="reg-email">Email</label>
    <input id="reg-email" type="email" name="email" autocomplete="email" required />

    <label for="reg-password">Пароль</label>
    <input
      id="reg-password"
      type="password"
      name="password"
      autocomplete="new-password"
      minlength="6"
      required
    />

    <button type="submit">Зарегистрироваться</button>
  </fieldset>
</form>
```

## Важно помнить

1. Без `name` поле **не попадёт** в отправку формы.
2. `method="get"` — данные в URL (поиск); `post` — в теле запроса (логин, пароли).
3. В реальном приложении (как Best Mentor) формы обрабатывает **JavaScript** + API, а не чистый HTML `action` — но разметка полей та же.

> В нашем проекте логин и регистрация — это React-формы с `react-hook-form`, но под капотом те же `email` и `password`, что и в HTML.
