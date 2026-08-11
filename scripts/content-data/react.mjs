export default [
  {
    slug: "react-vvedenie",
    title: "Введение в React",
    file: "01-vvedenie.md",
    sortOrder: 0,
    intro:
      "**React** — библиотека для построения пользовательских интерфейсов. Она описывает UI как функцию от данных: когда данные меняются, React пересчитывает, что нужно обновить в DOM.",
    sections: [
      {
        h: "Зачем React",
        p: "В классическом подходе ты вручную ищешь элементы в DOM и меняешь их. В React ты описываешь **состояние** и **разметку** — библиотека сама синхронизирует экран. Это особенно удобно в SPA: списки разделов, формы логина, страница главы — всё живёт в одном приложении без перезагрузки.",
        list: [
          "Компонентный подход — переиспользуемые блоки UI",
          "Декларативность — «что показать», а не «как перерисовать DOM»",
          "Экосистема — React Router, Redux, react-hook-form",
        ],
      },
      {
        h: "Минимальный компонент",
        p: "Компонент — функция, которая возвращает JSX (разметку). В современных проектах используют функциональные компоненты и хуки.",
        code: `function Welcome() {
  return <h1>Привет, Best Mentor!</h1>;
}

// Точка входа (main.tsx)
import { createRoot } from "react-dom/client";
import { Welcome } from "./Welcome";

createRoot(document.getElementById("root")!).render(<Welcome />);`,
        lang: "tsx",
      },
      {
        h: "Дерево компонентов",
        p: "Приложение — дерево: корень `App`, внутри layout, страницы, виджеты. В Best Mentor, например: `BaseLayout` → `ProtectedRoute` → `Sections` или `Chapter`.",
        code: `function App() {
  return (
    <BaseLayout>
      <Header />
      <main>
        <Sections />
      </main>
    </BaseLayout>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Инструменты",
        p: "Обычный стек: **Vite** + **TypeScript** + **React 18+**. Сборка, HMR и алиасы путей (`@/`) ускоряют разработку.",
      },
    ],
    table: {
      headers: ["Понятие", "Смысл"],
      rows: [
        ["Компонент", "Функция/класс, возвращающий UI"],
        ["JSX", "Синтаксис разметки внутри JavaScript"],
        ["Props", "Входные данные компонента"],
        ["State", "Внутренние данные, влияющие на рендер"],
      ],
    },
    quote:
      "React не навязывает архитектуру целиком — ты выбираешь роутинг, стейт и формы, но сам UI всегда строится из компонентов.",
    outro:
      "Дальше разберём JSX — как писать разметку внутри JavaScript и почему у каждого элемента должен быть один корневой узел (или Fragment).",
  },
  {
    slug: "react-jsx",
    title: "JSX",
    file: "02-jsx.md",
    sortOrder: 1,
    intro:
      "**JSX** — расширение синтаксиса JavaScript: HTML-подобная разметка внутри кода. На этапе сборки он превращается в вызовы `React.createElement`.",
    sections: [
      {
        h: "Правила JSX",
        p: "Один корневой элемент на return (или `<>...</>` — Fragment). Закрывай все теги. Атрибуты в camelCase: `className`, `onClick`, `htmlFor`.",
        code: `function Card() {
  return (
  <>
    <h2 className="title">Глава</h2>
    <p>Контент в markdown</p>
  </>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Выражения в фигурных скобках",
        p: "В `{}` можно вставлять переменные, вызовы функций, тернарный оператор.",
        code: `const title = "React Router";
const isAdmin = true;

function Badge() {
  return (
    <span className={isAdmin ? "badge admin" : "badge"}>
      {title.toUpperCase()}
    </span>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Стили и атрибуты",
        p: "Инлайн-стили — объект: `style={{ marginTop: 16 }}`. В проектах чаще SCSS-модули: `className={styles.form}`.",
        code: `import styles from "./LoginForm.module.scss";

<button type="submit" className={styles.submit}>
  Войти
</button>`,
        lang: "tsx",
      },
      {
        h: "Комментарии",
        p: "Внутри JSX комментарий: `{/* текст */}`. Обычные `//` перед return не попадут в разметку.",
      },
    ],
    quote:
      "JSX — это не HTML: `class` становится `className`, а самозакрывающиеся теги обязательны (`<img />`, `<input />`).",
    outro:
      "Следующая глава — компоненты и props: как передавать данные сверху вниз и собирать UI из маленьких частей.",
  },
  {
    slug: "react-komponenty-i-props",
    title: "Компоненты и props",
    file: "03-komponenty-i-props.md",
    sortOrder: 2,
    intro:
      "Компонент получает **props** (properties) от родителя. Props **только для чтения** — менять их внутри дочернего компонента нельзя.",
    sections: [
      {
        h: "Объявление props",
        p: "Деструктуризация в параметрах — самый читаемый вариант.",
        code: `type SectionItemProps = {
  title: string;
  slug: string;
  chapterCount: number;
};

function SectionItem({ title, slug, chapterCount }: SectionItemProps) {
  return (
    <article>
      <h3>{title}</h3>
      <p>Slug: {slug}</p>
      <span>{chapterCount} глав</span>
    </article>
  );
}`,
        lang: "tsx",
      },
      {
        h: "children",
        p: "Вложенное содержимое между тегами попадает в `props.children`. Так устроены layout и обёртки.",
        code: `function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Значения по умолчанию",
        p: "Можно задать default в деструктуризации или через defaultProps (реже в TS).",
        code: `function Button({
  variant = "primary",
  children,
}: {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}) {
  return <button className={variant}>{children}</button>;
}`,
        lang: "tsx",
      },
      {
        h: "Композиция вместо наследования",
        p: "В React не наследуют компоненты — собирают их вместе и передают данные через props.",
      },
    ],
    table: {
      headers: ["Правило", "Почему"],
      rows: [
        ["Props immutable", "Предсказуемый поток данных сверху вниз"],
        ["Один компонент — одна задача", "Проще тестировать и переиспользовать"],
        ["Типизировать props", "Ошибки ловятся на этапе компиляции"],
      ],
    },
    outro:
      "Когда данные должны меняться внутри компонента, нужен **state** — хук `useState`.",
  },
  {
    slug: "react-use-state",
    title: "useState",
    file: "04-use-state.md",
    sortOrder: 3,
    intro:
      "`useState` хранит локальное состояние компонента. При обновлении state React **перерисовывает** компонент и его потомков.",
    sections: [
      {
        h: "Базовый синтаксис",
        code: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Нажато: {count}
    </button>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Функциональное обновление",
        p: "Если новое значение зависит от предыдущего, передавай функцию — так безопаснее в асинхронных сценариях.",
        code: `setCount((prev) => prev + 1);`,
        lang: "tsx",
      },
      {
        h: "Объекты и массивы",
        p: "Не мутируй state напрямую. Создавай новый объект или копию массива.",
        code: `const [user, setUser] = useState({ name: "", email: "" });

setUser((prev) => ({ ...prev, email: "admin@fe-academy.local" }));`,
        lang: "tsx",
      },
      {
        h: "Несколько state",
        p: "Можно вызывать `useState` несколько раз. В форме логина Best Mentor отдельно хранят `isLoading` рядом с react-hook-form.",
        code: `const [isLoading, setIsLoading] = useState(false);`,
        lang: "tsx",
      },
    ],
    quote:
      "State — это снимок UI в конкретный момент. Обновление асинхронно: сразу после setState старое значение ещё видно в текущем рендере.",
    outro:
      "Чтобы реагировать на клики и ввод, связывают state с **обработчиками событий**.",
  },
  {
    slug: "react-sobytiya",
    title: "События",
    file: "05-sobytiya.md",
    sortOrder: 4,
    intro:
      "В React события именуются в camelCase (`onClick`, `onChange`, `onSubmit`). Обработчик получает **синтетическое событие** — обёртку с кроссбраузерным API.",
    sections: [
      {
        h: "onClick и preventDefault",
        code: `function LinkButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Клик без перехода");
  };

  return <button onClick={handleClick}>Действие</button>;
}`,
        lang: "tsx",
      },
      {
        h: "onChange для input",
        code: `function SearchField() {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Поиск главы..."
    />
  );
}`,
        lang: "tsx",
      },
      {
        h: "onSubmit формы",
        p: "Всегда вызывай `e.preventDefault()`, иначе страница перезагрузится. В Best Mentor submit идёт через `handleSubmit` из react-hook-form.",
        code: `const onSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // отправка
};

<form onSubmit={onSubmit}>...</form>`,
        lang: "tsx",
      },
      {
        h: "Передача аргументов",
        p: "Не вызывай функцию сразу в JSX — оберни в стрелку.",
        code: `// Плохо: handleDelete(id) выполнится при рендере
<button onClick={() => handleDelete(id)}>Удалить</button>`,
        lang: "tsx",
      },
    ],
    outro:
      "На основе событий и state строят **условный рендер** — показ разного UI в зависимости от данных.",
  },
  {
    slug: "react-uslovnyy-render",
    title: "Условный рендер",
    file: "06-uslovnyy-render.md",
    sortOrder: 5,
    intro:
      "React позволяет рендерить разметку по условию: оператор `&&`, тернарный `? :`, ранний `return` или переменная с JSX.",
    sections: [
      {
        h: "&& — показать, если true",
        code: `{isAdmin && <button>Добавить раздел</button>}`,
        lang: "tsx",
      },
      {
        h: "Тернарный оператор",
        code: `{token ? <Sections /> : <Login />}`,
        lang: "tsx",
      },
      {
        h: "Ранний return",
        p: "Удобно для загрузки и guard-компонентов, как `ProtectedRoute`.",
        code: `function ProtectedRoute() {
  const token = useAppSelector((s) => s.user.token);

  if (token === undefined) {
    return <Spinner />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}`,
        lang: "tsx",
      },
      {
        h: "Переменная с JSX",
        code: `let content;

if (error) {
  content = <ErrorMessage />;
} else if (isLoading) {
  content = <Spinner />;
} else {
  content = <ChapterContent />;
}

return <div>{content}</div>;`,
        lang: "tsx",
      },
    ],
    quote:
      "Не вкладывай слишком много тернарников в JSX — вынеси логику в переменную или отдельный компонент.",
    outro:
      "Для коллекций данных используют `.map()` и обязательный атрибут **key**.",
  },
  {
    slug: "react-spiski-i-keys",
    title: "Списки и keys",
    file: "07-spiski-i-keys.md",
    sortOrder: 6,
    intro:
      "Списки рендерят через `array.map()`. Атрибут **key** помогает React сопоставить элементы между рендерами при добавлении, удалении и сортировке.",
    sections: [
      {
        h: "Базовый список",
        code: `const chapters = [
  { id: 1, title: "Введение" },
  { id: 2, title: "JSX" },
];

<ul>
  {chapters.map((chapter) => (
    <li key={chapter.id}>{chapter.title}</li>
  ))}
</ul>`,
        lang: "tsx",
      },
      {
        h: "key должен быть стабильным",
        p: "Используй уникальный id из данных. Индекс массива — только если список статичен и не сортируется.",
        list: [
          "Хорошо: `key={chapter.id}`",
          "Плохо: `key={Math.random()}`",
          "Осторожно: `key={index}` при DnD reorder",
        ],
      },
      {
        h: "Список компонентов",
        code: `{sections.map((section) => (
  <SectionItem
    key={section.id}
    title={section.title}
    slug={section.slug}
  />
))}`,
        lang: "tsx",
      },
      {
        h: "Fragment в map",
        p: "Если нужно вернуть несколько соседних узлов, оберни в Fragment с key: `<Fragment key={id}>`.",
      },
    ],
    outro:
      "Формы со вводом текста почти всегда делают **controlled** — значение в state, изменения через onChange.",
  },
  {
    slug: "react-formy-controlled",
    title: "Формы controlled",
    file: "08-formy-controlled.md",
    sortOrder: 7,
    intro:
      "**Controlled component** — поле, значение которого хранится в React state. Браузер не «владеет» значением — источник правды один.",
    sections: [
      {
        h: "Controlled input",
        code: `const [email, setEmail] = useState("");

<input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>`,
        lang: "tsx",
      },
      {
        h: "Checkbox и select",
        code: `const [agree, setAgree] = useState(false);

<input
  type="checkbox"
  checked={agree}
  onChange={(e) => setAgree(e.target.checked)}
/>

<select value={role} onChange={(e) => setRole(e.target.value)}>
  <option value="STUDENT">Студент</option>
  <option value="ADMIN">Админ</option>
</select>`,
        lang: "tsx",
      },
      {
        h: "react-hook-form в Best Mentor",
        p: "Для сложных форм используют библиотеку: меньше ручного state, встроенная валидация через zod.",
        code: `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const { control, handleSubmit } = useForm<LoginFormValues>({
  resolver: zodResolver(loginSchema),
});

<form onSubmit={handleSubmit(onSubmit)}>
  <FormFields fields={fields} control={control} />
  <Button type="submit" isLoading={isLoading}>Войти</Button>
</form>`,
        lang: "tsx",
      },
      {
        h: "Controlled vs uncontrolled",
        p: "Uncontrolled — значение читают через ref (`inputRef.current.value`). Controlled проще валидировать и синхронизировать с UI.",
      },
    ],
    table: {
      headers: ["Подход", "Когда"],
      rows: [
        ["useState + onChange", "Простые поля, обучение"],
        ["react-hook-form", "Формы с валидацией, много полей"],
        ["useRef", "Фокус, файлы, редкие uncontrolled сценарии"],
      ],
    },
    outro:
      "Побочные эффекты (запросы, подписки, таймеры) выносят в `useEffect`.",
  },
  {
    slug: "react-use-effect",
    title: "useEffect",
    file: "09-use-effect.md",
    sortOrder: 8,
    intro:
      "`useEffect` запускает код **после** рендера: загрузка данных, подписки, синхронизация с внешним миром. Не используй его для вычисления того, что можно посчитать прямо в render.",
    sections: [
      {
        h: "Базовый эффект",
        code: `useEffect(() => {
  document.title = \`Глава: \${chapterTitle}\`;
}, [chapterTitle]);`,
        lang: "tsx",
      },
      {
        h: "Массив зависимостей",
        p: "Пустой `[]` — один раз при монтировании. Без массива — после каждого рендера (редко нужно). С зависимостями — при их изменении.",
        list: [
          "`[]` — mount (restore сессии)",
          "`[id]` — при смене id",
          "`[a, b]` — при изменении a или b",
        ],
      },
      {
        h: "Cleanup",
        p: "Функция, возвращаемая из эффекта, вызывается перед следующим запуском и при размонтировании.",
        code: `useEffect(() => {
  const timer = setInterval(() => tick(), 1000);
  return () => clearInterval(timer);
}, []);`,
        lang: "tsx",
      },
      {
        h: "Загрузка при старте (Best Mentor)",
        p: "В `useAuthSession` при монтировании читают токен из localStorage и запрашивают профиль.",
        code: `useEffect(() => {
  const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (!savedToken) {
    dispatch(clearToken());
    return;
  }

  profileService
    .getProfile(savedToken, undefined, { skipErrorToast: true })
    .then((user) => {
      dispatch(setToken(savedToken));
      dispatch(setUser(user));
    })
    .catch(() => dispatch(clearToken()));
}, []);`,
        lang: "tsx",
      },
    ],
    quote:
      "Если эффект только дублирует render-логику — убери его. Effect для синхронизации с системой вне React.",
    outro:
      "Когда нужна ссылка на DOM-узел или мутабельное значение без перерисовки — `useRef`.",
  },
  {
    slug: "react-use-ref",
    title: "useRef",
    file: "10-use-ref.md",
    sortOrder: 9,
    intro:
      "`useRef` хранит **мутабельное** значение между рендерами. Изменение `.current` **не вызывает** повторный рендер.",
    sections: [
      {
        h: "Ссылка на DOM",
        code: `const inputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  inputRef.current?.focus();
}, []);

return <input ref={inputRef} />;`,
        lang: "tsx",
      },
      {
        h: "Хранение предыдущего значения",
        code: `const prevId = useRef<number | null>(null);

useEffect(() => {
  prevId.current = chapterId;
}, [chapterId]);`,
        lang: "tsx",
      },
      {
        h: "Таймеры и id подписок",
        p: "Удобно класть id интервала или AbortController в ref, чтобы очистить в cleanup.",
      },
      {
        h: "ref vs state",
        p: "Если изменение должно обновить UI — state. Если нужно «запомнить» что-то между рендерами без paint — ref.",
      },
    ],
    table: {
      headers: ["Хук", "Перерисовка при изменении"],
      rows: [
        ["useState", "Да"],
        ["useRef", "Нет"],
        ["useReducer", "Да"],
      ],
    },
    outro:
      "Для дорогих вычислений и стабильных колбэков — `useMemo` и `useCallback`.",
  },
  {
    slug: "react-use-memo-use-callback",
    title: "useMemo / useCallback",
    file: "11-use-memo-use-callback.md",
    sortOrder: 10,
    intro:
      "`useMemo` кеширует **результат вычисления**, `useCallback` — **саму функцию**. Оба пересчитываются при изменении зависимостей.",
    sections: [
      {
        h: "useMemo",
        code: `const sortedChapters = useMemo(
  () => [...chapters].sort((a, b) => a.sortOrder - b.sortOrder),
  [chapters],
);`,
        lang: "tsx",
      },
      {
        h: "useCallback",
        code: `const handleDelete = useCallback(
  (id: number) => {
    chaptersService.delete(id);
  },
  [],
);`,
        lang: "tsx",
      },
      {
        h: "Когда не нужны",
        p: "Не оборачивай всё подряд — хуки стоят памяти и усложняют код. Сначала измерь профилировщиком или реши проблему архитектурой.",
        list: [
          "Тяжёлая фильтрация большого списка",
          "Передача колбэка в memo-компонент",
          "Зависимости useEffect",
        ],
      },
      {
        h: "Стабильные ссылки",
        p: "Без useCallback функция создаётся заново каждый рендер — дочерний `React.memo` может лишний раз сравнивать props.",
      },
    ],
    quote:
      "Преждевременная мемоизация — типичный антипаттерн. Оптимизируй, когда есть реальная проблема.",
    outro:
      "Чтобы не прокидывать props через много уровней, используют **Context API**.",
  },
  {
    slug: "react-context-api",
    title: "Context API",
    file: "12-context-api.md",
    sortOrder: 11,
    intro:
      "Context передаёт значение **вглубь дерева** без явного prop drilling. Подходит для темы, локали, редко меняющихся настроек.",
    sections: [
      {
        h: "Создание и Provider",
        code: `const ThemeContext = createContext<"light" | "dark">("light");

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <ThemeContext.Provider value={theme}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}`,
        lang: "tsx",
      },
      {
        h: "useContext",
        code: `function Toolbar() {
  const theme = useContext(ThemeContext);
  return <div className={theme}>...</div>;
}`,
        lang: "tsx",
      },
      {
        h: "Context vs Redux",
        p: "В Best Mentor глобальный **auth state** — в Redux (`userSlice`), а не в Context: предсказуемые обновления, DevTools, middleware.",
      },
      {
        h: "Разделение контекстов",
        p: "Один огромный context на всё приложение вызывает лишние ререндеры. Дроби по зонам ответственности.",
      },
    ],
    outro:
      "Для навигации между страницами в SPA — **React Router**.",
  },
  {
    slug: "react-router",
    title: "React Router",
    file: "13-react-router.md",
    sortOrder: 12,
    intro:
      "**React Router** сопоставляет URL и компоненты. В версии 6+ используют `createBrowserRouter`, layout routes и `Outlet` для вложенных маршрутов.",
    sections: [
      {
        h: "Конфигурация роутера (Best Mentor)",
        code: `export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sections" replace />,
  },
  {
    element: <AuthRoute />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
  {
    element: <BaseLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "sections", element: <Sections /> },
          { path: "chapter/:id", element: <Chapter /> },
        ],
      },
    ],
  },
]);`,
        lang: "tsx",
      },
      {
        h: "Link и Navigate",
        code: `import { Link, useNavigate } from "react-router-dom";

<Link to="/sections">Разделы</Link>

const navigate = useNavigate();
navigate(ROUTES.sections, { replace: true });`,
        lang: "tsx",
      },
      {
        h: "Параметры и Outlet",
        code: `const { id } = useParams();

// Layout route рендерит дочерний маршрут:
function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Protected и Auth routes",
        p: "Guard-компоненты оборачивают `Outlet`: неавторизованный → login, авторизованный на login → redirect home.",
      },
    ],
    table: {
      headers: ["API", "Назначение"],
      rows: [
        ["useParams", "Параметры URL"],
        ["useNavigate", "Программный переход"],
        ["useLocation", "Текущий path и state"],
        ["Outlet", "Место для child route"],
      ],
    },
    outro:
      "Общее состояние для соседних компонентов поднимают к ближайшему общему родителю — **lifting state up**.",
  },
  {
    slug: "react-podnyatie-sostoyaniya",
    title: "Поднятие состояния",
    file: "14-podnyatie-sostoyaniya.md",
    sortOrder: 13,
    intro:
      "Если два компонента должны делить одни данные, state хранят в **родителе** и передают вниз через props + колбэки для обновления.",
    sections: [
      {
        h: "Схема",
        p: "Родитель: `const [value, setValue] = useState()`. Детям: `value` и `onChange={setValue}` или обёртка.",
        code: `function FilterPanel() {
  const [query, setQuery] = useState("");

  return (
    <>
      <SearchInput value={query} onChange={setQuery} />
      <ChapterList filter={query} />
    </>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Однонаправленный поток",
        p: "Данные вниз (props), события вверх (callbacks). Так проще отлаживать, чем при мутациях в разных местах.",
      },
      {
        h: "Когда поднимать слишком высоко",
        p: "Если props проходят через 5+ уровней без использования — пора Context или глобальный store (Redux).",
      },
      {
        h: "Контролируемый список",
        code: `function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);

  const handleReorder = (next: Section[]) => {
    setSections(next);
    sectionsService.reorder(next);
  };

  return <SectionsList items={sections} onReorder={handleReorder} />;
}`,
        lang: "tsx",
      },
    ],
    outro:
      "Вместо наследования UI собирают через **композицию** — children, render props, slots.",
  },
  {
    slug: "react-kompoziciya",
    title: "Композиция",
    file: "15-kompoziciya.md",
    sortOrder: 14,
    intro:
      "Композиция — сборка сложного UI из простых частей. React поощряет «has-a» (содержит), а не «is-a» (наследует).",
    sections: [
      {
        h: "children как слот",
        code: `function Modal({ title, children, onClose }: ModalProps) {
  return (
    <div className="overlay">
      <div className="modal">
        <header>
          <h2>{title}</h2>
          <Button variant="ghost" onClick={onClose}>×</Button>
        </header>
        {children}
      </div>
    </div>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Несколько слотов через props",
        code: `function Card({ header, footer, children }: CardProps) {
  return (
    <article>
      <header>{header}</header>
      <div>{children}</div>
      <footer>{footer}</footer>
    </article>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Композиция layout",
        p: "`BaseLayout` + `Outlet` — классический паттерн: оболочка статична, содержимое меняется роутером.",
      },
      {
        h: "Специализация через обёртку",
        code: `function CreateChapterModal(props: Omit<ModalProps, "title">) {
  return (
    <Modal title="Новая глава" {...props}>
      <CreateChapterForm />
    </Modal>
  );
}`,
        lang: "tsx",
      },
    ],
    quote:
      "Хороший компонент делает одну вещь и принимает гибкое содержимое через children или render props.",
    outro:
      "Повторяющуюся логику с хуками выносят в **custom hooks**.",
  },
  {
    slug: "react-custom-hooks",
    title: "Custom hooks",
    file: "16-custom-hooks.md",
    sortOrder: 15,
    intro:
      "Custom hook — функция с префиксом `use`, внутри которой вызываются другие хуки. Это способ переиспользовать **логику**, не копируя JSX.",
    sections: [
      {
        h: "Правила хуков",
        list: [
          "Вызывать только на верхнем уровне (не в if/for)",
          "Только из React-функций или других хуков",
          "Имя начинается с `use`",
        ],
      },
      {
        h: "useAuthSession",
        p: "В Best Mentor логика восстановления сессии вынесена в хук и helper `loginWithToken`.",
        code: `export const useAuthSession = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!savedToken) {
      dispatch(clearToken());
      return;
    }
    // загрузка профиля...
  }, [dispatch]);
};`,
        lang: "tsx",
      },
      {
        h: "Хук для fetch",
        code: `function useChapter(id: number) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    chaptersService.getById(id).then((data) => {
      if (!cancelled) setChapter(data);
    }).finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => { cancelled = true; };
  }, [id]);

  return { chapter, isLoading };
}`,
        lang: "tsx",
      },
      {
        h: "Возвращаемое значение",
        p: "Можно вернуть массив, объект или tuple — как у `useState`. Объект читается при нескольких полях.",
      },
    ],
    outro:
      "С TypeScript типизируют props, state, события и ответы API — глава **React + TypeScript**.",
  },
  {
    slug: "react-typescript",
    title: "React + TypeScript",
    file: "17-typescript.md",
    sortOrder: 16,
    intro:
      "TypeScript добавляет статическую типизацию: меньше ошибок в props, событиях и данных с API. В Best Mentor весь UI на `.tsx`.",
    sections: [
      {
        h: "Типы props",
        code: `type ButtonProps = {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  // ...
};`,
        lang: "tsx",
      },
      {
        h: "События",
        code: `const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value);
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
};`,
        lang: "tsx",
      },
      {
        h: "Generic компоненты",
        code: `type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  kind: "input" | "textarea";
};`,
        lang: "tsx",
      },
      {
        h: "Типы из API",
        p: "DTO лежат в `shared/api/dto/`, сущности — в `entities/`. Не дублируй одни и те же поля в десяти местах.",
        code: `export interface AuthUser {
  id: number;
  email: string;
  role: "STUDENT" | "ADMIN";
}`,
        lang: "ts",
      },
    ],
    table: {
      headers: ["Тип", "Пример"],
      rows: [
        ["React.ReactNode", "children, любой renderable контент"],
        ["React.FC", "Редко — явные props предпочтительнее"],
        ["ComponentProps<typeof Button>", "Унаследовать props кнопки"],
      ],
    },
    outro:
      "Глобальное состояние приложения в Best Mentor — **Redux Toolkit**.",
  },
  {
    slug: "react-redux",
    title: "Redux",
    file: "18-redux.md",
    sortOrder: 17,
    intro:
      "**Redux** хранит состояние приложения в одном store. **Redux Toolkit** (`createSlice`, `configureStore`) убирает бойлерплейт классического Redux.",
    sections: [
      {
        h: "Slice (userSlice)",
        code: `const userSlice = createSlice({
  name: "user",
  initialState: { token: undefined as string | null | undefined, user: null },
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});`,
        lang: "ts",
      },
      {
        h: "Store и типизированные хуки",
        code: `export const store = configureStore({
  reducer: { user: userReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;`,
        lang: "ts",
      },
      {
        h: "Использование в компоненте",
        code: `const token = useAppSelector((state) => state.user.token);
const dispatch = useAppDispatch();

dispatch(setToken(accessToken));`,
        lang: "tsx",
      },
      {
        h: "Когда Redux, когда local state",
        p: "Redux — auth, данные, нужные многим страницам. `useState` — UI модалки, локальный ввод, табы.",
      },
    ],
    quote:
      "В Best Mentor токен в localStorage, user — только в Redux. Не дублируй user в LS.",
    outro:
      "Чтобы уменьшить лишние ререндеры, применяют `React.memo` и осознанную оптимизацию.",
  },
  {
    slug: "react-memo-optimizaciya",
    title: "React.memo оптимизация",
    file: "19-react-memo-optimizaciya.md",
    sortOrder: 18,
    intro:
      "`React.memo` оборачивает компонент и пропускает ререндер, если props **поверхностно** равны предыдущим.",
    sections: [
      {
        h: "Базовое использование",
        code: `const SectionItem = memo(function SectionItem({ title, slug }: Props) {
  return (
    <article>
      <h3>{title}</h3>
      <span>{slug}</span>
    </article>
  );
});`,
        lang: "tsx",
      },
      {
        h: "Кастомное сравнение",
        code: `export const ChapterRow = memo(
  ChapterRowComponent,
  (prev, next) => prev.id === next.id && prev.title === next.title,
);`,
        lang: "tsx",
      },
      {
        h: "Что мешает memo",
        list: [
          "Новая функция в props каждый рендер — нужен useCallback",
          "Новый объект/массив в props — нужен useMemo или стабильная ссылка",
          "Context выше по дереву меняется — memo не спасёт",
        ],
      },
      {
        h: "Практический подход",
        p: "Сначала нормальная структура компонентов. Оптимизируй узкие места: длинные списки, тяжёлые карточки, частые обновления родителя.",
      },
    ],
    outro:
      "Код сплитят через `lazy` и показывают fallback в `Suspense` — следующая глава.",
  },
  {
    slug: "react-lazy-suspense",
    title: "lazy / Suspense",
    file: "20-lazy-suspense.md",
    sortOrder: 19,
    intro:
      "`React.lazy` загружает компонент **динамически** (отдельный chunk). `Suspense` показывает fallback, пока chunk грузится.",
    sections: [
      {
        h: "Lazy import",
        code: `const LoginFormLazy = lazy(() =>
  import("./LoginForm").then((m) => ({ default: m.LoginForm })),
);`,
        lang: "tsx",
      },
      {
        h: "Suspense boundary",
        code: `function LoginPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <LoginFormLazy />
    </Suspense>
  );
}`,
        lang: "tsx",
      },
      {
        h: "Маршруты и код-сплиттинг",
        p: "React Router может lazy-load страницы — начальный bundle меньше, страница качается по требованию.",
      },
      {
        h: "Ошибки загрузки",
        p: "Lazy сам не ловит сбой сети — комбинируй с Error Boundary или retry в import().",
      },
    ],
    table: {
      headers: ["Инструмент", "Роль"],
      rows: [
        ["lazy()", "Динамический import компонента"],
        ["Suspense", "UI ожидания"],
        ["Error Boundary", "Падение при render/load"],
      ],
    },
    outro:
      "Error Boundary перехватывает ошибки рендера в поддереве и показывает запасной UI.",
  },
  {
    slug: "react-error-boundaries",
    title: "Error Boundaries",
    file: "21-error-boundaries.md",
    sortOrder: 20,
    intro:
      "**Error Boundary** — классовый компонент (или библиотека) с `getDerivedStateFromError` / `componentDidCatch`. Ловит ошибки **в дочерних** компонентах при рендере, не в event handlers и async вне render.",
    sections: [
      {
        h: "Минимальный boundary",
        code: `class ErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}`,
        lang: "tsx",
      },
      {
        h: "Где ставить",
        p: "Вокруг страницы, тяжёлого виджета или markdown-рендерера — чтобы сбой одной главы не уронил всё приложение.",
        code: `<ErrorBoundary fallback={<p>Не удалось показать главу</p>}>
  <ChapterContent markdown={content} />
</ErrorBoundary>`,
        lang: "tsx",
      },
      {
        h: "Что не ловится",
        list: [
          "Ошибки в самом boundary",
          "Асинхронный код в useEffect (нужен try/catch)",
          "Обработчики событий (try/catch внутри handler)",
          "SSR на сервере — отдельные паттерны",
        ],
      },
      {
        h: "Связь с API",
        p: "Ошибки запросов в Best Mentor показывает interceptor (тост), а не boundary. Boundary — для неожиданных падений UI.",
      },
    ],
    quote:
      "Error Boundary — последняя линия обороны UI, а не замена нормальной обработке ошибок в async-коде.",
    outro:
      "Модалки и тултипы часто рендерят через **порталы** — вне основного DOM-дерева.",
  },
  {
    slug: "react-portaly",
    title: "Порталы",
    file: "22-portaly.md",
    sortOrder: 21,
    intro:
      "**Portal** (`createPortal`) рендерит дочерний UI в другой узел DOM — обычно `document.body`, сохраняя контекст React-дерева.",
    sections: [
      {
        h: "Базовый портал",
        code: `import { createPortal } from "react-dom";

function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body,
  );
}`,
        lang: "tsx",
      },
      {
        h: "Зачем порталы",
        list: [
          "Модалки поверх всего (z-index, overflow родителя)",
          "Тултипы и dropdown без обрезки",
          "Сохранение props/context от родителя React",
        ],
      },
      {
        h: "Доступность",
        p: "Закрытие по Escape, фокус внутри модалки, `aria-modal` и `role=\"dialog\"` — не забывай при использовании портала.",
      },
      {
        h: "Портал в shared UI",
        p: "В Best Mentor модалки — переиспользуемый компонент в `shared/ui`. Портал внутри kit избавляет от дублирования разметки на страницах.",
        code: `// Упрощённо: Modal рендерит children в body
export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.dialog} role="dialog" aria-modal="true">
        <h2>{title}</h2>
        {children}
        <Button variant="ghost" onClick={onClose}>Закрыть</Button>
      </div>
    </div>,
    document.body,
  );
}`,
        lang: "tsx",
      },
    ],
    table: {
      headers: ["Паттерн", "Где в проекте"],
      rows: [
        ["Portal", "Modal, overlay"],
        ["Error Boundary", "Страница / тяжёлый блок"],
        ["lazy + Suspense", "Редкие страницы и формы"],
        ["Redux", "Auth, глобальные данные"],
      ],
    },
    quote:
      "Портал меняет место в DOM, но не место в React-дереве — события всплывают по React-иерархии, как обычно.",
    outro:
      "Ты прошёл базовый курс React: от JSX и state до роутинга, Redux и продвинутых приёмов. Практикуй на реальном проекте — лучший способ закрепить материал.",
  },
];
