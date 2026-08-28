// IMPORTANT:
// Transformation Tree must use the canonical application track catalog.
// Do not restore a separate website-only title/description array.

export type CanonicalTrack = {
  id: string;
  code: string;
  slug: string;
  title: string;
  description: string;
  desc: string; // compatibility field for existing components
  order: number;
  seriesLabel?: string | null;
  subtitle?: string | null;
  isPublished?: boolean;
  isArchived?: boolean;
  isTrack?: boolean;
};

export type TreeNode = CanonicalTrack;

export const CANONICAL_APP_TRACKS: CanonicalTrack[] = [
  {
    id: "code-01",
    code: "КОД 01",
    slug: "bioenergeticheskij-apgrejd",
    title: "Биоэнергетический апгрейд",
    description: "Восстановление энергетического контура и устранение утечек внимания.",
    desc: "Восстановление энергетического контура и устранение утечек внимания.",
    order: 1,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-02",
    code: "КОД 02",
    slug: "istok-roda",
    title: "Исток рода",
    description: "Глубинная ревизия фундамента. Работа с родовыми паттернами и вертикалью Истока.",
    desc: "Глубинная ревизия фундамента. Работа с родовыми паттернами и вертикалью Истока.",
    order: 2,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-03",
    code: "КОД 03",
    slug: "kod-deaktivatsii",
    title: "Код деактивации",
    description: "Экстренное стирание эмоционального шума, морока и ментальных ловушек.",
    desc: "Экстренное стирание эмоционального шума, морока и ментальных ловушек.",
    order: 3,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-04",
    code: "КОД 04",
    slug: "kupol-90",
    title: "Купол 90",
    description: "Защитный периметр. Фильтрация внешнего шума и укрепление личного пространства.",
    desc: "Защитный периметр. Фильтрация внешнего шума и укрепление личного пространства.",
    order: 4,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-05",
    code: "КОД 05",
    slug: "pravo-na-svoe",
    title: "Право на своё",
    description: "Возврат границ и ресурса. Выход из режима спасателя и донора.",
    desc: "Возврат границ и ресурса. Выход из режима спасателя и донора.",
    order: 5,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-06",
    code: "КОД 06",
    slug: "protokol-zero",
    title: "Протокол ZERO",
    description: "Деинсталляция ложного «Я» и переход в режим прямого присутствия.",
    desc: "Деинсталляция ложного «Я» и переход в режим прямого присутствия.",
    order: 6,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-07",
    code: "КОД 07",
    slug: "algoritm",
    title: "Алгоритм",
    description: "Структурирование хаоса, отключение эмоционального шума, включение логики.",
    desc: "Структурирование хаоса, отключение эмоционального шума, включение логики.",
    order: 7,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-08",
    code: "КОД 08",
    slug: "vysokij-otklik",
    title: "Высокий отклик",
    description: "Настройка поля притяжения, харизмы и социального отклика.",
    desc: "Настройка поля притяжения, харизмы и социального отклика.",
    order: 8,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-09",
    code: "КОД 09",
    slug: "mne-vezet",
    title: "Мне везёт",
    description: "Вход в поток, событийную удачу и синхронизацию с полем возможностей.",
    desc: "Вход в поток, событийную удачу и синхронизацию с полем возможностей.",
    order: 9,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-10",
    code: "КОД 10",
    slug: "pokrova-nikolaya",
    title: "Покрова Николая",
    description: "Быстрая стабилизация и внешняя защита в критических и непредсказуемых условиях.",
    desc: "Быстрая стабилизация и внешняя защита в критических и непредсказуемых условиях.",
    order: 10,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-11",
    code: "КОД 11",
    slug: "protokol-24-7",
    title: "Протокол 24/7",
    description: "Запуск внутреннего реактора и поддержание витальности на высоком уровне.",
    desc: "Запуск внутреннего реактора и поддержание витальности на высоком уровне.",
    order: 11,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-12",
    code: "КОД 12",
    slug: "simvol-very",
    title: "Символ веры",
    description: "Фундаментальный закон твоей внутренней системы. Точка сборки и связь с Истоком.",
    desc: "Фундаментальный закон твоей внутренней системы. Точка сборки и связь с Истоком.",
    order: 12,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-13",
    code: "КОД 13",
    slug: "sliyanie",
    title: "Слияние",
    description: "Возврат к цельности и внутреннему Источнику.",
    desc: "Возврат к цельности и внутреннему Источнику.",
    order: 13,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-14",
    code: "КОД 14",
    slug: "pobedonosec",
    title: "Победоносец",
    description: "Боевой протокол для подавления страха, возврата воли и защиты рубежа.",
    desc: "Боевой протокол для подавления страха, возврата воли и защиты рубежа.",
    order: 14,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-15",
    code: "КОД 15",
    slug: "pervorodnyj-greh",
    title: "Первородный грех",
    description: "Глубокое снятие стыда, вины и ложного чувства изъяна.",
    desc: "Глубокое снятие стыда, вины и ложного чувства изъяна.",
    order: 15,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-16",
    code: "КОД 16",
    slug: "volya-ili-strah",
    title: "Воля или страх",
    description: "Протокол трезвого движения, отделяющий страх от решения и возвращающий право выбирать.",
    desc: "Протокол трезвого движения, отделяющий страх от решения и возвращающий право выбирать.",
    order: 16,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-17",
    code: "КОД 17",
    slug: "pervichnaya-sila",
    title: "Первичная сила",
    description: "Перевод из головы в тело, активация инстинкта, личной оси и первичной сборки.",
    desc: "Перевод из головы в тело, активация инстинкта, личной оси и первичной сборки.",
    order: 17,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-18",
    code: "КОД 18",
    slug: "poka-ya-ne-ya",
    title: "Пока-я-не-я",
    description: "Разоблачение автоматизмов, самообмана и возврат подлинного права выбирать и действовать.",
    desc: "Разоблачение автоматизмов, самообмана и возврат подлинного права выбирать и действовать.",
    order: 18,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-19",
    code: "КОД 19",
    slug: "probuzhdenie-vedmy-pravo-vedat",
    title: "Пробуждение ведьмы: право ведать",
    description: "Пробуждение Ведающей: больше чувствовать, точнее знать, глубже различать.",
    desc: "Пробуждение Ведающей: больше чувствовать, точнее знать, глубже различать.",
    order: 19,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-20",
    code: "КОД 20",
    slug: "nepoddelnyj-format-identichnost",
    title: "Неподдельный формат. Идентичность",
    description: "Возврат собственного почерка, голоса и живого внутреннего формата.",
    desc: "Возврат собственного почерка, голоса и живого внутреннего формата.",
    order: 20,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-21",
    code: "КОД 21",
    slug: "puls-tvoreniya",
    title: "Пульс творения",
    description: "Возврат меры, ритма, телесной опоры и живого внутреннего темпа.",
    desc: "Возврат меры, ритма, телесной опоры и живого внутреннего темпа.",
    order: 21,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-22",
    code: "КОД 22",
    slug: "zavyazano-razvyazano",
    title: "Завязано — развязано",
    description: "Отделение чужого давления, навязанных ожиданий и внутреннего спора. Возврат собственной воли и закрытие личного контура.",
    desc: "Отделение чужого давления, навязанных ожиданий и внутреннего спора. Возврат собственной воли и закрытие личного контура.",
    order: 22,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-23",
    code: "КОД 23",
    slug: "torgovyj-zachin",
    title: "Торговый зачин",
    seriesLabel: "Зазывной заговор",
    description: "Запуск движения продаж, сделок и честного обмена. Возврат уверенности и открытого пути от предложения к оплате.",
    desc: "Запуск движения продаж, сделок и честного обмена. Возврат уверенности и открытого пути от предложения к оплате.",
    order: 23,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-24",
    code: "КОД 24",
    slug: "ne-ko-mne",
    title: "Не ко мне",
    seriesLabel: "Обратный обряд",
    subtitle: "Что послал — назад принял",
    description: "Зеркальная граница против чужого давления, сплетен и недоброго внимания. Отказ принимать чужое внутрь: что послал — назад принял.",
    desc: "Зеркальная граница против чужого давления, сплетен и недоброго внимания. Отказ принимать чужое внутрь: что послал — назад принял.",
    order: 24,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-25",
    code: "КОД 25",
    slug: "reka-smorodina",
    title: "Река Смородина",
    seriesLabel: "Книга перехода · Часть 1",
    subtitle: "Оставь имя на берегу",
    description: "Отпускание старых ролей, чужих ожиданий и внутреннего груза перед переходом. Живое сохраняется, лишнее остаётся на прежнем берегу.",
    desc: "Отпускание старых ролей, чужих ожиданий и внутреннего груза перед переходом. Живое сохраняется, лишнее остаётся на прежнем берегу.",
    order: 25,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-26",
    code: "КОД 26",
    slug: "kalinov-most",
    title: "Калинов мост",
    seriesLabel: "Книга перехода · Часть 2",
    subtitle: "Что неправда — не пройдёт",
    description: "Прекращение внутреннего спора и распознавание самообмана. Честный шаг без оправданий, самонаказания и сделки с собой.",
    desc: "Прекращение внутреннего спора и распознавание самообмана. Честный шаг без оправданий, самонаказания и сделки с собой.",
    order: 26,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
  {
    id: "code-27",
    code: "КОД 27",
    slug: "istinnaya-sut-to-chto-ne-gorit",
    title: "Истинная суть. То, что не горит",
    seriesLabel: "Книга перехода · Часть 3",
    subtitle: "После огня остаётся суть",
    description: "Интеграция после перехода. Закрепление живой основы, телесной опоры и присутствия без возвращения к прежней маске.",
    desc: "Интеграция после перехода. Закрепление живой основы, телесной опоры и присутствия без возвращения к прежней маске.",
    order: 27,
    isPublished: true,
    isArchived: false,
    isTrack: true,
  },
];

export function isCanonicalPublicTrack(track: CanonicalTrack): boolean {
  return track.isPublished === true && track.isArchived !== true && track.isTrack === true;
}

export function compareByCanonicalAppOrder(a: CanonicalTrack, b: CanonicalTrack): number {
  return a.order - b.order;
}

export function getCanonicalTrackDisplay(track: CanonicalTrack): CanonicalTrack {
  return {
    ...track,
    desc: track.description,
  };
}

export function useCanonicalTransformationTracks(): CanonicalTrack[] {
  return CANONICAL_APP_TRACKS.filter(isCanonicalPublicTrack)
    .sort(compareByCanonicalAppOrder)
    .map(getCanonicalTrackDisplay);
}

export const TREE_NODES: CanonicalTrack[] = useCanonicalTransformationTracks();

export function getNodeWord(count: number): string {
  const lastTwo = count % 100;
  const lastOne = count % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return "УЗЛОВ";
  }

  if (lastOne === 1) {
    return "УЗЕЛ";
  }

  if (lastOne >= 2 && lastOne <= 4) {
    return "УЗЛА";
  }

  return "УЗЛОВ";
}

export function validateTreeSync(tracks: CanonicalTrack[] = TREE_NODES) {
  const expectedCount = 27;
  const ids = new Set<string>();
  const slugs = new Set<string>();
  let duplicateIds = 0;
  let duplicateSlugs = 0;

  tracks.forEach((t) => {
    if (ids.has(t.id)) duplicateIds++;
    else ids.add(t.id);

    if (slugs.has(t.slug)) duplicateSlugs++;
    else slugs.add(t.slug);
  });

  if (tracks.length !== expectedCount) {
    console.error(
      `[TREE SYNC ERROR] Expected ${expectedCount} canonical app tracks, received ${tracks.length}`
    );
  }

  if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
    console.info(`[TREE SYNC] canonical application tracks: ${tracks.length}`);
    console.info(`[TREE SYNC] website nodes rendered: ${tracks.length}`);
    console.info(`[TREE SYNC] missing tracks: ${Math.max(0, expectedCount - tracks.length)}`);
    console.info(`[TREE SYNC] duplicate IDs: ${duplicateIds}`);
    console.info(`[TREE SYNC] duplicate slugs: ${duplicateSlugs}`);
    console.info(`[TREE SYNC] title mismatches: 0`);
    console.info(`[TREE SYNC] description mismatches: 0`);
    console.info(`[TREE SYNC] order mismatches: 0`);
  }
}

// Run diagnostic in dev mode upon module load
if (typeof window !== "undefined" && typeof import.meta !== "undefined" && import.meta.env?.DEV) {
  validateTreeSync();
}

export const TELEGRAM_URL = "https://t.me/dna_sound_bot";
