const PRODUCT_PHOTOS = {
  "kinder-chocolate": "assets/product-kinder-chocolate.webp",
  "kinder-joy": "assets/product-kinder-joy.webp",
  "raffaello": "assets/product-raffaello.webp",
  "tic-tac": "assets/product-tic-tac.webp",
  "kitkat": "assets/product-kitkat.webp",
  "smarties": "assets/product-smarties.webp",
  "belvita": "assets/product-belvita.webp",
  "lavazza-beans": "assets/product-lavazza-beans.webp",
  "lavazza-ground": "assets/product-lavazza-ground.webp",
  "nescafe": "assets/product-nescafe.webp",
  "pringles-sour-cream": "assets/product-pringles-sour-cream.webp",
  "pringles-bbq": "assets/product-pringles-bbq.webp",
  "nutella-retail": "assets/product-nutella-retail.webp",
  "nutella-foodservice": "assets/product-nutella-foodservice.webp"
};
PRODUCTS.forEach(p=>{if(PRODUCT_PHOTOS[p.id])p.image=PRODUCT_PHOTOS[p.id];});
