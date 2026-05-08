function createMosOrbMarkup() {
  return '<div class="mos-orb"></div><div class="mos-orb-shadow"></div>';
}

function ensureMosLoader() {
  let loader = document.getElementById("mosLoader");
  if (loader) return loader;

  loader = document.createElement("div");
  loader.className = "mos-loader";
  loader.id = "mosLoader";
  loader.innerHTML = `
    <div class="mos-loader-inner">
      ${createMosOrbMarkup()}
      <p class="mos-loader-word">MOS</p>
    </div>
  `;
  document.body.appendChild(loader);
  return loader;
}

function showMosLoading() {
  ensureMosLoader().classList.add("active");
}

function hideMosLoading() {
  ensureMosLoader().classList.remove("active");
}

function getMosCartCount() {
  try {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    return cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  } catch (error) {
    return 0;
  }
}

function updateMosCartIcons() {
  const count = getMosCartCount();
  document.querySelectorAll(".nav-cart").forEach(link => {
    link.dataset.count = count ? String(count) : "";
    link.setAttribute("aria-label", count ? "Cart (" + count + ")" : "Cart");
  });
}

const mosLanguageOptions = [
  {code: "EN", locale: "en", label: "English"},
  {code: "ZH", locale: "zh-CN", label: "中文"},
  {code: "JP", locale: "ja", label: "日本語"},
  {code: "KR", locale: "ko", label: "한국어"}
];

const mosTranslations = {
  ZH: {
    "Featured": "精选",
    "Shop": "商店",
    "Collections": "系列",
    "Art of Living": "生活艺术",
    "Fragrances": "香氛",
    "FRAGRANCES": "香氛",
    "Fragrances | MOS": "香氛 | MOS",
    "Gifts": "礼赠",
    "Gifts for Her": "送给她的礼物",
    "Gifts for Him": "送给他的礼物",
    "Personalization": "定制",
    "Objects": "物件",
    "Bags": "包袋",
    "Belts": "腰带",
    "Wallets": "钱包",
    "Leather": "皮革",
    "Textiles": "纺织品",
    "Decorative Objects": "装饰风格",
    "Games": "游戏",
    "Pet Accessories": "宠物用品",
    "Spaces": "空间",
    "Home": "家居",
    "Travel": "旅行",
    "Daily Rituals": "日常仪式",
    "Series": "系列",
    "Archive": "档案",
    "Editorial": "编辑精选",
    "Seasonal Objects": "季节物件",
    "Material Study": "材料研究",
    "New Forms": "新形态",
    "Accessories Edit": "配饰编辑",
    "Archive Notes": "档案笔记",
    "Stories": "故事",
    "All Products": "全部商品",
    "Jewelry": "珠宝",
    "Accessories": "配饰",
    "Category": "品类",
    "Tops": "上装",
    "Skirts": "半裙",
    "Shoes": "鞋履",
    "Finish": "材质",
    "Silver": "银色",
    "Black": "黑色",
    "Gold": "金色",
    "Copper": "铜色",
    "Season": "季节",
    "Spring / Summer 2026": "2026 春夏",
    "Resort 2026": "2026 早春",
    "Index": "索引",
    "Mass": "Mass",
    "Order": "Order",
    "Surge": "Surge",
    "Signature Scents": "标志香调",
    "Discovery Set": "探索套装",
    "DISCOVERY SET": "探索套装",
    "Notes": "香调",
    "Amber": "琥珀",
    "Wood": "木质",
    "Floral": "花香",
    "Ritual": "仪式",
    "Body": "身体",
    "Home Scent": "家居香氛",
    "Travel Format": "旅行装",
    "TRAVEL FORMAT": "旅行装",
    "Gift Edit": "礼赠精选",
    "New Arrivals": "新品",
    "Occasion": "场景",
    "For Her": "赠予她",
    "For Him": "赠予他",
    "For Home": "赠予家",
    "Initials": "首字母",
    "Scarves": "帆布",
    "Fragments": "片段",
    "Custom Products": "定制产品",
    "Engraving": "刻字",
    "Service": "服务",
    "Gift Card": "礼品卡",
    "Wrapping": "礼品包装",
    "Personal Notes": "个人留言",
    "All Fragrances": "香水",
    "Bare Earth fragrance collection": "Bare Earth 香氛系列",
    "Fragrance products": "香氛商品",
    "A mineral fragrance study shaped around earth, glass, resin, and quiet ritual.": "围绕土地、玻璃、树脂与安静仪式展开的矿物香氛研究。",
    "6 products": "6 件商品",
    "8 products": "8 件商品",
    "KIRO products": "KIRO 商品",
    "AIDEN products": "AIDEN 商品",
    "BARE EARTH 01": "BARE EARTH 01 绿境",
    "BARE EARTH 01 | MOS": "BARE EARTH 01 绿境 | MOS",
    "BARE EARTH 02": "BARE EARTH 02 岩土",
    "BARE EARTH 03": "BARE EARTH 03 绿木",
    "BARE EARTH 04": "BARE EARTH 04 黑矿",
    "Bare Earth 01 Verde Silva": "Bare Earth 01 绿境",
    "Bare Earth 02 Terrain": "Bare Earth 02 岩土",
    "Bare Earth 03 Palo Verde": "Bare Earth 03 绿木",
    "Bare Earth 04 Mineral Noir": "Bare Earth 04 黑矿",
    "Bare Earth Discovery Set": "Bare Earth 探索套装",
    "Bare Earth Travel Format": "Bare Earth 旅行装",
    "Verde Silva": "绿境",
    "Terrain": "岩土",
    "Palo Verde": "绿木",
    "Mineral Noir": "黑矿",
    "Four scents": "四支香氛",
    "Refillable ritual vial": "可补充旅行香氛",
    "Scent": "香调",
    "Format": "规格",
    "75 ml / 2.5 fl. oz.": "75 ml / 2.5 fl. oz.",
    "A green mineral fragrance built around shaded leaf, cool resin, and polished glass. Quiet, precise, and grounded.": "围绕荫叶、冷树脂与抛光玻璃构成的绿色矿物香氛，安静、精准且沉稳。",
    "SKU: FR-BARE-EARTH-001": "SKU: FR-BARE-EARTH-001",
    "Back to Fragrances": "返回香氛系列",
    "Travel Sets": "旅行套装",
    "Refills": "补充装",
    "Free shipping in mainland China. Free shipping outside mainland China on orders over $100.": "中国大陆地区免运费，中国大陆以外地区满 100 美元免运费。",
    "Complimentary shipping on orders over $300.": "中国大陆地区免运费，中国大陆以外地区满 100 美元免运费。",
    "Shopping Cart": "购物车",
    "Continue Shopping": "继续购物",
    "Order Summary": "订单摘要",
    "Subtotal": "小计",
    "Shipping": "配送",
    "Taxes": "税费",
    "Total": "总计",
    "Calculated at checkout": "结账时计算",
    "Checkout": "结账",
    "Clear Cart": "清空购物车",
    "Your cart is empty": "你的购物车是空的",
    "Discover pieces from the latest collection.": "探索最新系列单品。",
    "Shop Collection": "浏览系列",
    "Return to cart": "返回购物车",
    "Contact": "联系方式",
    "Email or mobile number": "邮箱或手机号",
    "Shipping Address": "配送地址",
    "First name": "名",
    "Last name": "姓",
    "Address": "地址",
    "City": "城市",
    "Country / Region": "国家 / 地区",
    "Payment": "支付",
    "Pay with a Visa credit or debit card": "使用 Visa 信用卡或借记卡支付",
    "Continue with a PayPal checkout simulation": "继续 PayPal 模拟结账",
    "Pay with a UnionPay card simulation": "使用银联卡模拟支付",
    "Simulated Alipay redirect flow": "模拟支付宝跳转流程",
    "Card number": "卡号",
    "Expiry": "有效期",
    "Security code": "安全码",
    "Place Demo Order": "提交演示订单",
    "This is a front-end payment simulation. No payment will be processed.": "这是前端支付模拟，不会产生真实付款。",
    "Add a piece to your cart before starting checkout.": "请先将商品加入购物车再开始结账。",
    "Checkout | MOS": "结账 | MOS",
    "Cart | MOS": "购物车 | MOS",
    "Search": "搜索",
    "Account": "账户",
    "Cart": "购物袋",
    "Primary": "主导航",
    "Utility": "功能导航",
    "Sign in to MOS": "登录 MOS",
    "Email": "邮箱",
    "Mobile": "手机",
    "Password": "密码",
    "Forgot password?": "忘记密码？",
    "Create an account": "创建账户",
    "Sign In": "登录",
    "Mobile number": "手机号",
    "New Account": "新账户",
    "Create your MOS account": "创建你的 MOS 账户",
    "Create Account": "创建账户",
    "Already have an account?": "已有账户？",
    "Reset Password": "重置密码",
    "Send Recovery Link": "发送恢复链接",
    "Back to sign in": "返回登录",
    "Product Detail": "商品详情",
    "Add to Cart": "加入购物车",
    "Add To Cart": "加入购物车",
    "Find in Store": "查找门店",
    "Size and Fit": "尺码与版型",
    "Material and Care": "材质与护理",
    "Shipping and Returns": "配送与退换",
    "Details": "详情",
    "Color": "颜色",
    "Size": "尺码",
    "My Wishlist": "我的收藏清单",
    "Wishlist is not saved permanently yet. Please": "收藏清单尚未永久保存。请",
    "log in": "登录",
    "or": "或",
    "to save it.": "以保存。",
    "Your wishlist is empty.": "你的收藏清单是空的。",
    "Add All To Cart": "全部加入购物车",
    "Added to Wishlist": "已加入收藏",
    "Add to Wishlist": "加入收藏",
    "No results found.": "未找到结果。",
    "Search results": "搜索结果",
    "Color:": "颜色：",
    "Qty:": "数量：",
    "Remove": "移除",
    "View Shopping Cart": "查看购物车",
    "Tax calculated at checkout.": "税费将在结账时计算。",
    "How can we help?": "我们可以如何帮助你？",
    "Live chat": "在线咨询",
    "Mass · Order · Surge": "Mass · Order · Surge",
    "Craftsmanship meets identity.": "工艺与身份在此相遇。",
    "Vintage Necklace": "复古项链",
    "KIRO COLLECTION": "KIRO 系列",
    "KIRO Collection": "KIRO 系列",
    "AIDEN COLLECTION": "AIDEN 系列",
    "AIDEN Collection": "AIDEN 系列",
    "A sculptural collection shaped through metallic surfaces, precise silhouettes, and quiet force.": "以金属表面、利落轮廓与安静力量塑造的雕塑感系列。",
    "A refined study of form, utility, and everyday structure.": "关于形态、实用性与日常结构的精炼研究。"
  }
};

const mosReverseTranslations = Object.fromEntries(
  Object.entries(mosTranslations).map(([code, dictionary]) => [
    code,
    Object.fromEntries(Object.entries(dictionary).map(([english, translated]) => [translated, english]))
  ])
);

let mosTranslationObserver;
let mosTranslationPending = false;
let mosIsTranslating = false;

function getMosLanguage() {
  const saved = localStorage.getItem("mosLanguage");
  return mosLanguageOptions.some(option => option.code === saved) ? saved : "EN";
}

function getMosTextTranslation(text, code) {
  const trimmed = text.trim();
  if (!trimmed) return text;

  const cartCountMatch = trimmed.match(/^Cart \((\d+)\)$/);
  if (cartCountMatch) return code === "ZH" ? `购物袋（${cartCountMatch[1]}）` : text;

  if (code === "ZH") return mosTranslations.ZH[trimmed] || text;
  return mosReverseTranslations.ZH[trimmed] || text;
}

function shouldSkipMosTranslationNode(node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (parent.closest(".language-switcher, script, style, noscript, svg, canvas")) return true;
  if (parent.closest("[data-no-translate]")) return true;
  return false;
}

function translateMosTextNode(node, code) {
  if (shouldSkipMosTranslationNode(node)) return;

  const value = node.nodeValue;
  const leading = value.match(/^\s*/)[0];
  const trailing = value.match(/\s*$/)[0];
  const translated = getMosTextTranslation(value, code);
  if (translated !== value) node.nodeValue = `${leading}${translated.trim()}${trailing}`;
}

function translateMosAttributes(root, code) {
  root.querySelectorAll("[aria-label], [placeholder], [title]").forEach(element => {
    ["aria-label", "placeholder", "title"].forEach(attribute => {
      const value = element.getAttribute(attribute);
      if (!value) return;
      const translated = getMosTextTranslation(value, code);
      if (translated !== value) element.setAttribute(attribute, translated.trim());
    });
  });
}

function translateMosPage(code) {
  mosIsTranslating = true;
  const targetCode = code === "ZH" ? "ZH" : "EN";
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => translateMosTextNode(node, targetCode));
  translateMosAttributes(document, targetCode);

  document.title = getMosTextTranslation(document.title, targetCode).trim();
  mosIsTranslating = false;
}

function scheduleMosTranslation() {
  if (mosTranslationPending || mosIsTranslating) return;
  mosTranslationPending = true;
  setTimeout(() => {
    mosTranslationPending = false;
    translateMosPage(getMosLanguage());
  }, 0);
}

function observeMosTranslations() {
  if (mosTranslationObserver) return;
  mosTranslationObserver = new MutationObserver(scheduleMosTranslation);
  mosTranslationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["aria-label", "placeholder", "title"]
  });
}

function applyMosLanguage(code) {
  const option = mosLanguageOptions.find(item => item.code === code) || mosLanguageOptions[0];
  localStorage.setItem("mosLanguage", option.code);
  document.documentElement.lang = option.locale;

  document.querySelectorAll(".language-switcher").forEach(switcher => {
    const codeLabel = switcher.querySelector(".language-code");
    if (codeLabel) codeLabel.textContent = option.code;

    switcher.querySelectorAll(".language-option").forEach(button => {
      const isActive = button.dataset.language === option.code;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  });

  translateMosPage(option.code);
}

function createMosLanguageSwitcher() {
  const current = getMosLanguage();
  const switcher = document.createElement("div");
  switcher.className = "language-switcher";
  switcher.innerHTML = `
    <button class="language-toggle" type="button" aria-label="Select language" aria-expanded="false">
      <span class="language-globe" aria-hidden="true"></span>
      <span class="language-code">${current}</span>
    </button>
    <div class="language-menu" role="menu">
      ${mosLanguageOptions.map(option => `
        <button class="language-option" type="button" role="menuitemradio" data-language="${option.code}" aria-pressed="${option.code === current ? "true" : "false"}">
          <span>${option.label}</span>
          <span>${option.code}</span>
        </button>
      `).join("")}
    </div>
  `;

  const toggle = switcher.querySelector(".language-toggle");
  toggle.addEventListener("click", event => {
    event.stopPropagation();
    const isOpen = switcher.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  switcher.querySelectorAll(".language-option").forEach(button => {
    button.addEventListener("click", event => {
      event.stopPropagation();
      applyMosLanguage(button.dataset.language);
      switcher.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  return switcher;
}

function enhanceMosLanguageSwitchers() {
  document.querySelectorAll(".nav-right").forEach(nav => {
    if (nav.querySelector(".language-switcher")) return;
    nav.insertBefore(createMosLanguageSwitcher(), nav.firstElementChild);
  });

  applyMosLanguage(getMosLanguage());
}

function changePreview(previewId, imgSrc, text) {
  const preview = document.getElementById(previewId);
  if (!preview) return;

  const img = preview.querySelector("img");
  const label = preview.querySelector("p");
  if (!img || !label) return;

  preview.classList.add("is-switching");
  setTimeout(() => {
    img.src = imgSrc;
    label.textContent = text;
    preview.classList.remove("is-switching");
  }, 120);
}

const mosMegaMenuData = {
  "Featured": {
    previewId: "preview-featured",
    previewImage: "images/kirolab.png",
    previewText: "KIRO Lab",
    columns: [
      {
        title: "Editorial",
        links: [
          ["KIRO Lab", "kiro.html", "images/kirolab.png"],
          ["Seasonal Objects", "#", "images/pic3.jpg"],
          ["Material Study", "#", "images/pic2.jpg"]
        ]
      },
      {
        title: "Featured",
        links: [
          ["New Forms", "kiro.html", "images/kirolab.png"],
          ["Accessories Edit", "aiden.html", "images/aiden.png"],
          ["Archive Notes", "#", "images/pic4.jpg"]
        ]
      },
      {
        title: "Stories",
        links: [
          ["Mass", "#", "images/pic5.jpg"],
          ["Order", "#", "images/pic6.jpg"],
          ["Surge", "#", "images/kiro1.jpg"]
        ]
      }
    ]
  },
  "Shop": {
    previewId: "preview-shop",
    previewImage: "images/shop-model1.png",
    previewText: "All Products",
    columns: [
      {
        title: "Shop",
        links: [
          ["All Products", "kiro.html", "images/shop-model1.png"],
          ["Jewelry", "kiro.html", "images/kiro1.jpg"],
          ["Accessories", "aiden.html", "images/aiden.png"]
        ]
      },
      {
        title: "Category",
        links: [
          ["Tops", "kiro.html", "images/case21.png"],
          ["Skirts", "kiro.html", "images/kiro2.3.png"],
          ["Shoes", "aiden.html", "images/kiro5.11.png"]
        ]
      },
      {
        title: "Finish",
        links: [
          ["Silver", "#", "images/pic4.jpg"],
          ["Black", "#", "images/pic5.jpg"],
          ["Gold", "#", "images/pic6.jpg"]
        ]
      }
    ]
  },
  "Collections": {
    previewId: "preview-collections",
    previewImage: "images/pic3.jpg",
    previewText: "Spring / Summer 2026",
    columns: [
      {
        title: "Collections",
        links: [
          ["KIRO", "kiro.html", "images/kirolab.png"],
          ["AIDEN", "aiden.html", "images/aiden.png"],
          ["MOS Lab", "#", "images/pic3.jpg"]
        ]
      },
      {
        title: "Season",
        links: [
          ["Spring / Summer 2026", "#", "images/pic4.jpg"],
          ["Resort 2026", "#", "images/pic5.jpg"],
          ["Archive", "#", "images/pic6.jpg"]
        ]
      },
      {
        title: "Index",
        links: [
          ["Mass", "#", "images/kiro1.jpg"],
          ["Order", "#", "images/pic2.jpg"],
          ["Surge", "#", "images/kiro2.3.png"]
        ]
      }
    ]
  },
  "Art of Living": {
    previewId: "preview-living",
    previewImage: "images/aiden.png",
    previewText: "Art of Living",
    cards: [
      {
        title: "Leather",
        image: "images/aiden.png",
        links: [
          ["Leather", "aiden.html"]
        ]
      },
      {
        title: "Textiles",
        image: "images/pic5.jpg",
        links: [
          ["Textiles", "#"]
        ]
      },
      {
        title: "Games",
        image: "images/pic6.jpg",
        links: [
          ["Games", "#"]
        ]
      },
      {
        title: "Pet Accessories",
        image: "images/case21.png",
        links: [
          ["Pet Accessories", "#"]
        ]
      },
      {
        title: "Decorative Objects",
        image: "images/pic3.jpg",
        links: [
          ["Decorative Objects", "#"]
        ]
      }
    ]
  },
  "Fragrances": {
    previewId: "preview-fragrances",
    previewImage: "images/fragrances-mega.png",
    previewText: "Fragrances",
    columns: [
      {
        title: "Fragrances",
        links: [
          ["All Fragrances", "fragrances.html", "images/fragrances-mega.png"],
          ["Signature Scents", "#", "images/pic5.jpg"],
          ["Discovery Set", "#", "images/pic6.jpg"]
        ]
      },
      {
        title: "Notes",
        links: [
          ["Amber", "#", "images/pic2.jpg"],
          ["Wood", "#", "images/pic3.jpg"],
          ["Floral", "#", "images/kiro1.jpg"]
        ]
      },
      {
        title: "Ritual",
        links: [
          ["Body", "#", "images/kirolab.png"],
          ["Home Scent", "#", "images/aiden.png"],
          ["Travel Format", "#", "images/case21.png"]
        ]
      }
    ]
  },
  "Gifts": {
    previewId: "preview-gifts",
    previewImage: "images/kirolab.png",
    previewText: "Gifts",
    cards: [
      {
        title: "Gifts for Her",
        image: "images/kiro1.jpg",
        links: [
          ["Bags", "aiden.html"],
          ["Shoes", "kiro.html"],
          ["Wallets", "#"],
          ["Accessories", "aiden.html"],
          ["Jewelry", "kiro.html"]
        ]
      },
      {
        title: "Gifts for Him",
        image: "images/aiden.png",
        links: [
          ["Bags", "aiden.html"],
          ["Shoes", "kiro.html"],
          ["Wallets", "#"],
          ["Accessories", "aiden.html"],
          ["Jewelry", "kiro.html"]
        ]
      },
      {
        title: "Personalization",
        image: "images/case21.png",
        links: [
          ["Initials", "#"],
          ["Scarves", "#"],
          ["Fragments", "#"],
          ["Custom Products", "#"],
          ["Engraving", "#"]
        ]
      },
      {
        title: "Art of Living",
        image: "images/pic3.jpg",
        links: [
          ["Leather", "aiden.html"],
          ["Textiles", "#"],
          ["Decorative Objects", "#"],
          ["Games", "#"],
          ["Pet Accessories", "#"]
        ]
      },
      {
        title: "Fragrances",
        image: "images/fragrances-mega.png",
        links: [
          ["All Fragrances", "fragrances.html"],
          ["Travel Sets", "#"],
          ["Refills", "#"]
        ]
      }
    ]
  }
};

function createMegaMenu(menuData) {
  const menu = document.createElement("div");
  menu.className = "mega-menu mos-generated-mega";

  if (menuData.cards) {
    menu.classList.add("gift-mega-menu");
    const grid = document.createElement("div");
    grid.className = "gift-mega-grid";

    menuData.cards.forEach(cardData => {
      const card = document.createElement("div");
      card.className = "gift-mega-card";

      const imageLink = document.createElement("a");
      imageLink.className = "gift-mega-image";
      imageLink.href = cardData.links[0] ? cardData.links[0][1] : "#";
      imageLink.innerHTML = `<img src="${cardData.image}" alt="">`;
      card.appendChild(imageLink);

      const title = document.createElement("a");
      title.className = "gift-mega-title";
      title.href = cardData.links[0] ? cardData.links[0][1] : "#";
      title.textContent = cardData.title;
      card.appendChild(title);

      const shouldShowList = cardData.links.length > 1 || cardData.links[0][0] !== cardData.title;
      if (shouldShowList) {
        const list = document.createElement("div");
        list.className = "gift-mega-list";
        cardData.links.forEach(([label, href]) => {
          const link = document.createElement("a");
          link.href = href;
          link.textContent = label;
          list.appendChild(link);
        });
        card.appendChild(list);
      }
      grid.appendChild(card);
    });

    menu.appendChild(grid);
    return menu;
  }

  const links = document.createElement("div");
  links.className = "mega-links";

  menuData.columns.forEach(columnData => {
    const column = document.createElement("div");
    column.className = "mega-column";

    const title = document.createElement("h4");
    title.textContent = columnData.title;
    column.appendChild(title);

    columnData.links.forEach(([label, href, image]) => {
      const link = document.createElement("a");
      link.href = href;
      link.textContent = label;
      link.addEventListener("mouseenter", () => {
        changePreview(menuData.previewId, image, label);
      });
      column.appendChild(link);
    });

    links.appendChild(column);
  });

  const preview = document.createElement("div");
  preview.className = "mega-preview";
  preview.id = menuData.previewId;
  preview.innerHTML = `<img src="${menuData.previewImage}" alt=""><p>${menuData.previewText}</p>`;

  menu.appendChild(links);
  menu.appendChild(preview);
  return menu;
}

function positionMegaMenu(menu) {
  const rect = menu.getBoundingClientRect();
  const padding = 16;
  const overflowRight = rect.right - (window.innerWidth - padding);
  const overflowLeft = padding - rect.left;
  let shift = 0;

  if (overflowRight > 0) shift -= overflowRight;
  if (overflowLeft > 0) shift += overflowLeft;

  menu.style.setProperty("--mega-menu-left", `${shift}px`);
  menu.classList.toggle("is-shifted", shift !== 0);
}

function enhanceMosMegaMenus() {
  document.querySelectorAll(".nav-left").forEach(nav => {
    Array.from(nav.children).forEach(child => {
      if (child.classList && child.classList.contains("nav-item")) {
        const link = child.querySelector(":scope > a");
        if (!link) return;

        const label = link.textContent.trim();
        const menuData = mosMegaMenuData[label];
        if (!menuData) return;

        child.querySelectorAll(":scope > .mega-menu").forEach(menu => menu.remove());
        child.appendChild(createMegaMenu(menuData));
        return;
      }

      if (!(child instanceof HTMLAnchorElement)) return;

      const label = child.textContent.trim();
      const menuData = mosMegaMenuData[label];
      if (!menuData) return;

      const item = document.createElement("div");
      item.className = "nav-item";
      child.replaceWith(item);
      item.appendChild(child);
      item.appendChild(createMegaMenu(menuData));
    });
  });

  document.querySelectorAll(".nav-left .nav-item").forEach(item => {
    const menu = item.querySelector(".mega-menu");
    if (!menu) return;
    item.addEventListener("mouseenter", () => positionMegaMenu(menu));
    window.addEventListener("resize", () => positionMegaMenu(menu));
  });
}

function shouldShowMosLoading(link) {
  if (!link || link.target === "_blank" || link.hasAttribute("download")) return false;
  if (link.hasAttribute("onclick")) return false;
  if (link.getAttribute("href") === "#") return false;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === window.location.pathname && url.hash) return false;

  return url.pathname.endsWith(".html") || url.protocol === "file:";
}

document.addEventListener("click", event => {
  if (event.defaultPrevented) return;

  document.querySelectorAll(".language-switcher.is-open").forEach(switcher => {
    if (switcher.contains(event.target)) return;
    switcher.classList.remove("is-open");
    const toggle = switcher.querySelector(".language-toggle");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  });

  const link = event.target.closest("a");
  if (!shouldShowMosLoading(link)) return;
  showMosLoading();
});

window.addEventListener("pageshow", hideMosLoading);
window.addEventListener("pageshow", updateMosCartIcons);
document.addEventListener("DOMContentLoaded", () => {
  enhanceMosMegaMenus();
  enhanceMosLanguageSwitchers();
  observeMosTranslations();
  updateMosCartIcons();
});
