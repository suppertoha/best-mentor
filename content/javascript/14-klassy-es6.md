# Классы ES6

Классы — синтаксический сахар над прототипным наследованием JavaScript. Удобны для моделей данных и сервисов.

## Объявление класса

```js
class Chapter {
  constructor(title, slug) {
    this.title = title;
    this.slug = slug;
  }

  getLabel() {
    return `${this.title} (${this.slug})`;
  }
}

const ch = new Chapter("Массивы", "js-arrays");
console.log(ch.getLabel());
```

## Геттеры и сеттеры

```js
class User {
  #passwordHash = "";

  constructor(email) {
    this.email = email;
  }

  get displayEmail() {
    return this.email.toLowerCase();
  }

  set password(value) {
    this.#passwordHash = `hash:${value}`;
  }
}

const u = new User("Admin@Example.com");
u.password = "123";
console.log(u.displayEmail);
```

## Наследование extends

```js
class PublishedChapter extends Chapter {
  constructor(title, slug, publishedAt) {
    super(title, slug);
    this.publishedAt = publishedAt;
  }

  isNew() {
    const week = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - this.publishedAt < week;
  }
}
```

## Статические методы

```js
class IdGenerator {
  static next() {
    return Math.random().toString(36).slice(2, 9);
  }
}

console.log(IdGenerator.next());
```

Крупные приложения разбивают на модули — отдельные файлы с экспортом и импортом.
