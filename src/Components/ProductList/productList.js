import banana from '../../assets/images/banana.png';
import beef from '../../assets/images/beef.png';
import broccoli from '../../assets/images/broccoli.png';
import butter from '../../assets/images/butter.png';
import cabbage from '../../assets/images/cabbage.png';
import capsicum from '../../assets/images/capsicum.png';
import cheese from '../../assets/images/cheese.png';
import chickenBreast from '../../assets/images/chicken-breast.png';
import condensedMilk from '../../assets/images/condensed-milk.png';
import eggplant from '../../assets/images/eggplant.png';
import eggs from '../../assets/images/eggs.png';
import grapes from '../../assets/images/grapes.png';
import kale from '../../assets/images/kale.png';
import lettuce from '../../assets/images/lettuce.png';
import milk from '../../assets/images/milk.png';
import pineapple from '../../assets/images/pineapple.png';
import ricottaCheese from '../../assets/images/ricotta-cheese.png';
import salmon from '../../assets/images/salmon.png';
import shrimp from '../../assets/images/shrimp.png';
import sliceCheese from '../../assets/images/slice-cheese.png';
import strawberry from '../../assets/images/strawberry.png';
import tilapia from '../../assets/images/tilapia.png';
import tofu from '../../assets/images/tofu.png';
import yogurt from '../../assets/images/yogurt.png';

const productList = [
  {
    id: 1,
    title: "Banana",
    price: "0.99",
    image: banana,
    category: "Fruits",
    description: "Fresh, ripe bananas packed with potassium and natural sweetness.",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    weight: "1 lb",
    origin: "Ecuador"
  },
  {
    id: 2,
    title: "Beef",
    price: "12.99",
    image: beef,
    category: "Meat",
    description: "Premium quality beef, grass-fed and humanely raised.",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    weight: "1 lb",
    origin: "USA"
  },
  {
    id: 3,
    title: "Broccoli",
    price: "2.49",
    image: broccoli,
    category: "Vegetables",
    description: "Fresh, organic broccoli rich in vitamins and minerals.",
    rating: 4.3,
    reviews: 156,
    inStock: true,
    weight: "1 lb",
    origin: "California"
  },
  {
    id: 4,
    title: "Butter",
    price: "3.99",
    image: butter,
    category: "Dairy",
    description: "Creamy, unsalted butter made from the freshest cream.",
    rating: 4.7,
    reviews: 204,
    inStock: true,
    weight: "16 oz",
    brand: "Organic Valley"
  },
  {
    id: 5,
    title: "Cabbage",
    price: "1.99",
    image: cabbage,
    category: "Vegetables",
    description: "Crisp, fresh green cabbage perfect for salads and slaws.",
    rating: 4.1,
    reviews: 78,
    inStock: true,
    weight: "2 lbs",
    origin: "Local Farm"
  },
  {
    id: 6,
    title: "Capsicum",
    price: "0.99",
    image: capsicum,
    category: "Vegetables",
    description: "Sweet bell peppers available in multiple colors.",
    rating: 4.4,
    reviews: 132,
    inStock: true,
    weight: "1 lb",
    colors: ["Red", "Green", "Yellow"]
  },
  {
    id: 7,
    title: "Cheddar Cheese",
    price: "4.99",
    image: cheese,
    category: "Dairy",
    description: "Aged cheddar cheese, sharp and full of flavor.",
    rating: 4.6,
    reviews: 187,
    inStock: true,
    weight: "8 oz",
    brand: "Tillamook"
  },
  {
    id: 8,
    title: "Chicken Breast",
    price: "8.99",
    image: chickenBreast,
    category: "Poultry",
    description: "Boneless, skinless chicken breast, air chilled.",
    rating: 4.7,
    reviews: 215,
    inStock: true,
    weight: "1 lb",
    certification: "Organic"
  },
  {
    id: 9,
    title: "Condensed Milk",
    price: "2.49",
    image: condensedMilk,
    category: "Baking",
    description: "Sweetened condensed milk for desserts and baking.",
    rating: 4.5,
    reviews: 143,
    inStock: true,
    volume: "14 oz",
    brand: "Eagle Brand"
  },
  {
    id: 10,
    title: "Eggplant",
    price: "1.29",
    image: eggplant,
    category: "Vegetables",
    description: "Fresh, purple eggplant with a smooth, glossy skin.",
    rating: 4.0,
    reviews: 87,
    inStock: true,
    weight: "1 lb",
    origin: "Local"
  },
  {
    id: 11,
    title: "Free Range Eggs",
    price: "3.49",
    image: eggs,
    category: "Dairy & Eggs",
    description: "Farm-fresh free range eggs, large brown.",
    rating: 4.8,
    reviews: 312,
    inStock: true,
    quantity: "12 count",
    certification: "Free Range"
  },
  {
    id: 12,
    title: "Red Seedless Grapes",
    price: "4.99",
    image: grapes,
    category: "Fruits",
    description: "Sweet and juicy red seedless grapes, perfect for snacking.",
    rating: 4.6,
    reviews: 178,
    inStock: true,
    weight: "2 lbs",
    origin: "California"
  },
  {
    id: 13,
    title: "Organic Kale",
    price: "2.99",
    image: kale,
    category: "Vegetables",
    description: "Fresh, organic kale packed with nutrients.",
    rating: 4.2,
    reviews: 94,
    inStock: true,
    weight: "1 bunch",
    certification: "USDA Organic"
  },
  {
    id: 14,
    title: "Romaine Lettuce",
    price: "1.49",
    image: lettuce,
    category: "Vegetables",
    description: "Crisp and fresh romaine lettuce heads.",
    rating: 4.0,
    reviews: 132,
    inStock: true,
    weight: "1 head",
    variety: "Romaine"
  },
  {
    id: 15,
    title: "Organic Whole Milk",
    price: "3.29",
    image: milk,
    category: "Dairy",
    description: "Creamy, organic whole milk from grass-fed cows.",
    rating: 4.7,
    reviews: 245,
    inStock: true,
    volume: "1 gallon",
    brand: "Horizon Organic"
  },
  {
    id: 16,
    title: "Fresh Pineapple",
    price: "2.99",
    image: pineapple,
    category: "Fruits",
    description: "Sweet and juicy golden pineapple, perfect for snacking.",
    rating: 4.5,
    reviews: 167,
    inStock: true,
    weight: "3-4 lbs",
    origin: "Costa Rica"
  },
  {
    id: 17,
    title: "Whole Milk Ricotta",
    price: "4.49",
    image: ricottaCheese,
    category: "Dairy",
    description: "Creamy whole milk ricotta cheese, perfect for lasagna and desserts.",
    rating: 4.4,
    reviews: 98,
    inStock: true,
    weight: "15 oz",
    brand: "Galbani"
  },
  {
    id: 18,
    title: "Atlantic Salmon Fillet",
    price: "14.99",
    image: salmon,
    category: "Seafood",
    description: "Fresh Atlantic salmon fillet, skin-on, rich in omega-3.",
    rating: 4.9,
    reviews: 187,
    inStock: true,
    weight: "1 lb",
    source: "Wild Caught"
  },
  {
    id: 19,
    title: "Jumbo Shrimp",
    price: "16.99",
    image: shrimp,
    category: "Seafood",
    description: "Large, wild-caught shrimp, peeled and deveined.",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    weight: "1 lb",
    size: "16-20 count per pound"
  },
  {
    id: 20,
    title: "American Cheese Slices",
    price: "3.99",
    image: sliceCheese,
    category: "Deli",
    description: "Creamy American cheese slices, perfect for burgers and sandwiches.",
    rating: 4.3,
    reviews: 203,
    inStock: true,
    quantity: "24 slices",
    brand: "Kraft"
  },
  {
    id: 21,
    title: "Fresh Strawberries",
    price: "5.99",
    image: strawberry,
    category: "Fruits",
    description: "Sweet and juicy California strawberries, packed with antioxidants.",
    rating: 4.6,
    reviews: 231,
    inStock: true,
    weight: "2 lbs",
    season: "Spring/Summer"
  },
  {
    id: 22,
    title: "Fresh Tilapia Fillets",
    price: "9.99",
    image: tilapia,
    category: "Seafood",
    description: "Mild, flaky tilapia fillets, skinless and boneless.",
    rating: 4.4,
    reviews: 132,
    inStock: true,
    weight: "1 lb",
    source: "Farm Raised"
  },
  {
    id: 23,
    title: "Organic Firm Tofu",
    price: "3.49",
    image: tofu,
    category: "Meat Alternatives",
    description: "Organic, non-GMO firm tofu, high in plant-based protein.",
    rating: 4.2,
    reviews: 87,
    inStock: true,
    weight: "14 oz",
    certification: "USDA Organic"
  },
  {
    id: 24,
    title: "Greek Yogurt",
    price: "2.99",
    image: yogurt,
    category: "Dairy",
    description: "Creamy Greek yogurt with live active cultures, high in protein.",
    rating: 4.7,
    reviews: 198,
    inStock: true,
    size: "32 oz",
    flavor: "Plain",
    brand: "Fage"
  }
];

export default productList;
