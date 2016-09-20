/* GET services page */
module.exports.mainPage = function(req, res, next) {
	res.render('index', {
    title: 'Художник Анна Королюк: Товары',
    description: 'В этой онлайн мастерской вы можете увидеть примеры ' +
      'творческих работ и заказать картину',
    services: [
      {
        title: 'Модульные картины',
        url: '/Gallery#Modular',
        imgUrl: '/images/SectionModular-sm.jpg',
        imgDescription: 'Модульные картины',
        description: 'Современные модульные картины исполняются на нескольких ' +
          'холстах и украшают интерьер без рамок. Могут исполняться как по ' +
          'желаемому образцу заказчика, так и на усмотрение художника, всё ' +
          'зависит от ваших предпочтений. Техника исполнения: масляные ' +
          'краски, акриловые краски.'
      },
      {
        title: 'Авторские работы',
        url: '/Gallery#Painting',
        imgUrl: '/images/SectionPaining-sm.jpg',
        imgDescription: 'Авторские работы, живопись',
        description: 'Моя авторская живопись представлена на сайте пейзажами, ' +
          'натюрмортами, портретами. Я работаю масляными красками, акварелью,' +
          ' акрилом, темперой, пастелью. Здесь представлены работы разных ' +
          'периодов и техник. Вы можете заказать как авторскую работу, так и ' +
          'на интересующую вас тематику.'
      },
      {
        title: 'Мастер–классы',
        url: 'https://vk.com/videos-126365799',
        imgUrl: '/images/MasterClass-sm.jpg',
        imgDescription: 'Мастер–классы',
        description: 'Кроме изобразительной деятельности я таже занимаюсь ' +
          'мастер–классами по изобразительному искусству, по технике пысанки ' +
          '(роспись воском по яйцу), декоративному творчеству. Мастер–классы ' +
          'могут быть как индивидуальные, так и групповые (около 5 человек). ' +
          'Материалы входят в стоимость  мастер–классов.'
      },
      {
        title: 'Копии картин',
        url: '/Gallery#Copies',
        imgUrl: '/images/Copies-sm.jpg',
        imgDescription: 'Копии картин',
        description: 'Копии выполняются методом зрительного копирования с ' +
          'образца какой–либо знаменитой картины старых мастеров или более ' +
          'современного автора. Копия выполняется не по размеру оригинала, а ' +
          'на размер меньше или больше исходного. В основном копии пишутся ' +
          'масляными или темперными красками (темперой копируются иконы).'
      },
      {
        title: 'Декоративное творчество',
        url: '/Gallery#Handcraft',
        imgUrl: '/images/Handcraft-sm.jpg',
        imgDescription: 'Декоративное творчество',
        description: 'Этим видом творчества украшаются в основном предметы ' +
          'быта и интерьера. Декоративными узорами и рисунками можно украшать' +
          ' мебель,аксессуары, посуду. Всё выполняется эксклюзивно и ' +
          'креативно как масляными, так и акриловыми красками.'
      }
    ]
  });
};
/* GET prices and delivery page */
module.exports.pricesAndDelivery = function(req, res, next) {
  res.render('prices_and_delivery', {
    title: 'Художник Анна Королюк: Цены и доставка',
    description: 'В этой онлайн мастерской вы можете увидеть примеры ' +
      'творческих работ и заказать картину. Вы делаете заказ непосредсвенно ' +
      'у самого художника. Цена заказа всегда зависит от формата картины, ' +
      'темы исполнения и расхода материалов.'
  });
};
