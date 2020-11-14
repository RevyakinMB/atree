const messages = {
  ru: {
    Name: 'Наименование',
    Status: 'Статус',
    'Active from': 'Действует с',
    'Active until': 'Действует по',
    Options: 'Свойства',
    'Option {0}': 'Свойство {0}',
    'Status #{0}': 'Статус {0}',
    'No status': 'Статус не указан',
    Actions: 'Действия',
    Add: 'Добавить',
    Save: 'Сохранить',
    // TODO: replace with icons
    A: 'Д',
    E: 'Р',
    D: 'У',
    S: 'С',
    C: 'О',
  },
};

const pluralizationRules = {
  ru: (choice) => {
    if (choice % 10 === 1 && choice % 100 !== 11) {
      return 0;
    }
    if (choice % 10 >= 2 && choice % 10 <= 4 && (choice % 100 < 10 || choice % 100 >= 20)) {
      return 1;
    }
    return 2;
  },
};

export {
  messages,
  pluralizationRules,
};
