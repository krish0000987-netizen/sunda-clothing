import { FormEvent, useEffect, useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  gender: "Boys" | "Girls" | "Baby";
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  image: string;
  color: string;
  sizes: string[];
  badge?: string;
};

type CartLine = { product: Product; qty: number; size: string };

const products: Product[] = [
  {
    id: 1,
    name: "Striped T-shirt & Shorts Set",
    brand: "Sunda Original",
    category: "Co-ord Sets",
    gender: "Boys",
    price: 499,
    mrp: 999,
    rating: 4.4,
    reviews: 182,
    image:
      "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=85",
    color: "Orange",
    sizes: ["2-3 Y", "3-4 Y", "5-6 Y", "7-8 Y"],
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Blue Cotton Party Dress",
    brand: "Sunda Original",
    category: "Dresses",
    gender: "Girls",
    price: 649,
    mrp: 1299,
    rating: 4.5,
    reviews: 249,
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=85",
    color: "Sky Blue",
    sizes: ["2-3 Y", "4-5 Y", "6-7 Y", "8-9 Y"],
    badge: "Top Rated",
  },
  {
    id: 3,
    name: "Printed Round Neck Cotton Tee",
    brand: "Little Joy",
    category: "T-Shirts",
    gender: "Boys",
    price: 249,
    mrp: 599,
    rating: 4.2,
    reviews: 96,
    image:
      "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=800&q=85",
    color: "Navy",
    sizes: ["3-4 Y", "5-6 Y", "7-8 Y", "9-10 Y"],
  },
  {
    id: 4,
    name: "Denim Dungaree with Top",
    brand: "Sunda Original",
    category: "Dungarees",
    gender: "Girls",
    price: 799,
    mrp: 1599,
    rating: 4.6,
    reviews: 318,
    image:
      "https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&q=85",
    color: "Blue",
    sizes: ["2-3 Y", "3-4 Y", "5-6 Y", "7-8 Y"],
    badge: "Trending",
  },
  {
    id: 5,
    name: "Checked Casual Shirt",
    brand: "Tiny Tribe",
    category: "Shirts",
    gender: "Boys",
    price: 449,
    mrp: 899,
    rating: 4.1,
    reviews: 71,
    image:
      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=800&q=85",
    color: "Green",
    sizes: ["4-5 Y", "6-7 Y", "8-9 Y", "10-11 Y"],
  },
  {
    id: 6,
    name: "Floral Fit & Flare Dress",
    brand: "Sunda Original",
    category: "Dresses",
    gender: "Girls",
    price: 599,
    mrp: 1199,
    rating: 4.3,
    reviews: 154,
    image:
      "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=800&q=85",
    color: "Peach",
    sizes: ["2-3 Y", "4-5 Y", "6-7 Y", "8-9 Y"],
    badge: "New",
  },
  {
    id: 7,
    name: "Cloud Print Night Suit",
    brand: "Dreamy Days",
    category: "Nightwear",
    gender: "Baby",
    price: 549,
    mrp: 1099,
    rating: 4.7,
    reviews: 422,
    image:
      "https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=800&q=85",
    color: "Cream",
    sizes: ["0-1 Y", "1-2 Y", "2-3 Y", "3-4 Y"],
    badge: "Loved",
  },
  {
    id: 8,
    name: "Stretch Denim Joggers",
    brand: "Sunda Original",
    category: "Jeans",
    gender: "Boys",
    price: 699,
    mrp: 1399,
    rating: 4.3,
    reviews: 207,
    image:
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=800&q=85",
    color: "Indigo",
    sizes: ["4-5 Y", "6-7 Y", "8-9 Y", "10-11 Y"],
  },
  {
    id: 9,
    name: "Ruffle Sleeve Summer Top",
    brand: "Little Joy",
    category: "Tops",
    gender: "Girls",
    price: 329,
    mrp: 749,
    rating: 4.0,
    reviews: 83,
    image:
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&w=800&q=85",
    color: "Pink",
    sizes: ["3-4 Y", "5-6 Y", "7-8 Y", "9-10 Y"],
  },
  {
    id: 10,
    name: "Colourblock Hooded Sweatshirt",
    brand: "Tiny Tribe",
    category: "Sweatshirts",
    gender: "Boys",
    price: 749,
    mrp: 1499,
    rating: 4.5,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=800&q=85",
    color: "Orange",
    sizes: ["4-5 Y", "6-7 Y", "8-9 Y", "10-11 Y"],
    badge: "Hot Deal",
  },
  {
    id: 11,
    name: "Soft Knit Newborn Romper",
    brand: "Dreamy Days",
    category: "Baby Suits",
    gender: "Baby",
    price: 399,
    mrp: 899,
    rating: 4.6,
    reviews: 275,
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=800&q=85",
    color: "Beige",
    sizes: ["0-3 M", "3-6 M", "6-9 M", "9-12 M"],
  },
  {
    id: 12,
    name: "Wide Leg Cotton Trousers",
    brand: "Sunda Original",
    category: "Bottomwear",
    gender: "Girls",
    price: 549,
    mrp: 1099,
    rating: 4.2,
    reviews: 105,
    image:
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&w=800&q=85",
    color: "Brown",
    sizes: ["4-5 Y", "6-7 Y", "8-9 Y", "10-11 Y"],
  },
];

const categories = [
  ["Boys", "T-shirts, shirts & more", "👕"],
  ["Girls", "Dresses, tops & more", "✦"],
  ["Baby", "Soft newborn styles", "◌"],
  ["Co-ord Sets", "Easy matching looks", "◈"],
  ["Nightwear", "Cosy sleep essentials", "☾"],
  ["Summer Sale", "Min. 40% off", "%"],
];

function Icon({ name }: { name: string }) {
  const path: Record<string, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    cart: (
      <>
        <circle cx="9" cy="20" r="1" />
        <circle cx="19" cy="20" r="1" />
        <path d="M3 4h2l2.5 11h11l2-7H7" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    down: <path d="m6 9 6 6 6-6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    location: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    truck: (
      <>
        <path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" />
        <circle cx="7" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </>
    ),
    shield: <path d="M12 3 4 6v5c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-3Z" />,
    star: <path d="m12 2 3 6 7 .9-5 4.8 1.4 7-6.4-3.4-6.4 3.4 1.4-7-5-4.8L9 8l3-6Z" />,
    box: (
      <>
        <path d="m4 7 8-4 8 4-8 4-8-4Z" />
        <path d="M4 7v10l8 4 8-4V7M12 11v10" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
  };
  return (
    <svg
      className="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path[name]}
    </svg>
  );
}

function go(page: string, id?: number) {
  const path = page === "home" ? "/" : page === "product" ? `/product/${id}` : `/${page}`;
  history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  scrollTo({ top: 0, behavior: "smooth" });
}

function Logo() {
  return (
    <button className="logo" onClick={() => go("home")}>
      <span className="logo-symbol">S</span>
      <span>
        <b>Sunda</b>
        <small>ORIGINAL</small>
      </span>
    </button>
  );
}

function Header({
  cartCount,
  wishlistCount,
  onLogin,
}: {
  cartCount: number;
  wishlistCount: number;
  onLogin: () => void;
}) {
  const [query, setQuery] = useState("");
  const [mobile, setMobile] = useState(false);
  const suggestions = query
    ? products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];
  const submit = (e: FormEvent) => {
    e.preventDefault();
    sessionStorage.setItem("search", query);
    go("shop");
    setQuery("");
  };
  return (
    <>
      <div className="top-strip">
        <span>Free shipping above ₹999</span>
        <span>Easy 7-day returns</span>
        <span>Wholesale enquiries: +91 94279 61980</span>
      </div>
      <header className="main-header">
        <div className="header-inner">
          <button className="menu-button" onClick={() => setMobile(true)}>
            <Icon name="menu" />
          </button>
          <Logo />
          <form className="global-search" onSubmit={submit}>
            <Icon name="search" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for kids clothing, brands and more"
            />
            <button>Search</button>
            {query && (
              <div className="search-suggestions">
                {suggestions.length ? (
                  suggestions.map((p) => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => {
                        setQuery("");
                        go("product", p.id);
                      }}
                    >
                      <Icon name="search" />
                      <span>
                        {p.name}
                        <small>in {p.category}</small>
                      </span>
                    </button>
                  ))
                ) : (
                  <p>No matching products</p>
                )}
              </div>
            )}
          </form>
          <div className="header-actions">
            <button onClick={onLogin}>
              <Icon name="user" />
              <span>
                Login<small>Account</small>
              </span>
            </button>
            <button onClick={() => go("wishlist")}>
              <Icon name="heart" />
              <span>
                Wishlist<small>{wishlistCount} saved</small>
              </span>
              {wishlistCount > 0 && <i>{wishlistCount}</i>}
            </button>
            <button onClick={() => go("cart")}>
              <Icon name="cart" />
              <span>
                Cart<small>{cartCount} items</small>
              </span>
              {cartCount > 0 && <i>{cartCount}</i>}
            </button>
          </div>
        </div>
      </header>
      <nav className={`category-nav ${mobile ? "mobile-open" : ""}`}>
        <button className="mobile-close" onClick={() => setMobile(false)}>
          <Icon name="close" />
        </button>
        <button
          onClick={() => {
            go("home");
            setMobile(false);
          }}
        >
          Home
        </button>
        {["Boys", "Girls", "Baby", "Co-ord Sets", "Nightwear"].map((item) => (
          <button
            key={item}
            onClick={() => {
              sessionStorage.setItem("category", item);
              go("shop");
              setMobile(false);
            }}
          >
            {item}
            <Icon name="down" />
          </button>
        ))}
        <button
          className="sale-link"
          onClick={() => {
            go("shop");
            setMobile(false);
          }}
        >
          Summer Sale
        </button>
        <button
          onClick={() => {
            go("wholesale");
            setMobile(false);
          }}
        >
          Wholesale
        </button>
      </nav>
    </>
  );
}

function Rating({ value, count }: { value: number; count?: number }) {
  return (
    <span className="rating">
      {value} <span>★</span>
      {count !== undefined && <em>({count})</em>}
    </span>
  );
}

function ProductCard({
  product,
  wishlisted,
  onWishlist,
  onAdd,
}: {
  product: Product;
  wishlisted: boolean;
  onWishlist: () => void;
  onAdd: () => void;
}) {
  const off = Math.round((1 - product.price / product.mrp) * 100);
  return (
    <article className="product-card">
      <div className="product-photo">
        <button
          className={`wish-button ${wishlisted ? "active" : ""}`}
          onClick={onWishlist}
          aria-label="Add to wishlist"
        >
          <Icon name="heart" />
        </button>
        <button className="photo-button" onClick={() => go("product", product.id)}>
          <img src={product.image} alt={product.name} />
        </button>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button className="quick-add" onClick={onAdd}>
          Quick add
        </button>
      </div>
      <div className="product-copy">
        <p className="product-brand">{product.brand}</p>
        <button onClick={() => go("product", product.id)}>
          <h3>{product.name}</h3>
        </button>
        <Rating value={product.rating} count={product.reviews} />
        <div className="price">
          <b>₹{product.price}</b>
          <del>₹{product.mrp}</del>
          <span>{off}% off</span>
        </div>
        <small>Free delivery</small>
      </div>
    </article>
  );
}

function Home({ wishlist, toggleWishlist, addToCart }: ShopProps) {
  return (
    <main>
      <section className="home-hero">
        <div className="hero-copy">
          <span className="kicker">SUNDA BIG FASHION DAYS</span>
          <h1>
            Big smiles.
            <br />
            <em>Bigger savings.</em>
          </h1>
          <p>Refresh their wardrobe with joyful kidswear at prices you’ll love.</p>
          <div className="hero-offer">
            <b>50–70% OFF</b>
            <span>
              + extra 10% with code <strong>SUNDA10</strong>
            </span>
          </div>
          <button onClick={() => go("shop")} className="primary-button">
            Shop now <Icon name="arrow" />
          </button>
        </div>
        <div className="hero-visual">
          <img
            src="/images/sunda-kids-hero.png"
            alt="Children in colourful Sunda Original clothing"
          />
          <span className="hero-pill">
            New
            <br />
            <b>season</b>
          </span>
        </div>
      </section>
      <section className="category-section content-width">
        <div className="section-title">
          <div>
            <h2>Shop by category</h2>
            <p>Everything for their everyday adventures</p>
          </div>
          <button onClick={() => go("shop")}>
            View all <Icon name="arrow" />
          </button>
        </div>
        <div className="category-cards">
          {categories.map(([name, note, icon], i) => (
            <button
              key={name}
              onClick={() => {
                sessionStorage.setItem("category", name);
                go("shop");
              }}
            >
              <span className={`cat-icon cat-${i}`}>{icon}</span>
              <b>{name}</b>
              <small>{note}</small>
            </button>
          ))}
        </div>
      </section>
      <section className="deal-section">
        <div className="content-width">
          <div className="section-title">
            <div>
              <span className="section-tag">LIMITED-TIME DEALS</span>
              <h2>Top deals for tiny trendsetters</h2>
              <p>Ends tonight · Prices drop before the clock does</p>
            </div>
            <div className="deal-clock">
              <span>
                08<small>HRS</small>
              </span>
              <i>:</i>
              <span>
                24<small>MIN</small>
              </span>
              <i>:</i>
              <span>
                16<small>SEC</small>
              </span>
            </div>
          </div>
          <div className="product-grid">
            {products.slice(0, 5).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wishlisted={wishlist.includes(p.id)}
                onWishlist={() => toggleWishlist(p.id)}
                onAdd={() => addToCart(p, p.sizes[0])}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="benefit-row content-width">
        <div>
          <Icon name="truck" />
          <span>
            <b>Free delivery</b>
            <small>On orders above ₹999</small>
          </span>
        </div>
        <div>
          <Icon name="box" />
          <span>
            <b>Easy returns</b>
            <small>7-day return policy</small>
          </span>
        </div>
        <div>
          <Icon name="shield" />
          <span>
            <b>Secure payments</b>
            <small>100% protected checkout</small>
          </span>
        </div>
        <div>
          <Icon name="star" />
          <span>
            <b>Quality checked</b>
            <small>Made for all-day comfort</small>
          </span>
        </div>
      </section>
      <section className="two-banners content-width">
        <button onClick={() => go("shop")} className="boys-banner">
          <span>PLAY-READY PICKS</span>
          <h3>
            Cool looks for
            <br />
            busy boys
          </h3>
          <b>
            Shop boys <Icon name="arrow" />
          </b>
        </button>
        <button onClick={() => go("shop")} className="girls-banner">
          <span>TWIRL-WORTHY STYLES</span>
          <h3>
            New favourites
            <br />
            for girls
          </h3>
          <b>
            Shop girls <Icon name="arrow" />
          </b>
        </button>
      </section>
      <section className="content-width recent-section">
        <div className="section-title">
          <div>
            <h2>New & noteworthy</h2>
            <p>Fresh styles, just landed</p>
          </div>
          <button onClick={() => go("shop")}>
            Explore all <Icon name="arrow" />
          </button>
        </div>
        <div className="product-grid">
          {products.slice(5, 10).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              wishlisted={wishlist.includes(p.id)}
              onWishlist={() => toggleWishlist(p.id)}
              onAdd={() => addToCart(p, p.sizes[0])}
            />
          ))}
        </div>
      </section>
      <section className="app-banner content-width">
        <div>
          <span className="section-tag">THE SUNDA PROMISE</span>
          <h2>Fashion for every child.</h2>
          <p>
            Soft fabrics, happy colours and dependable quality—made thoughtfully in Ahmedabad and
            delivered across India.
          </p>
          <button onClick={() => go("wholesale")}>
            Discover our story <Icon name="arrow" />
          </button>
        </div>
        <div className="app-stats">
          <span>
            <b>13+</b>categories
          </span>
          <span>
            <b>10k+</b>happy families
          </span>
          <span>
            <b>Pan India</b>delivery
          </span>
        </div>
      </section>
    </main>
  );
}

type ShopProps = {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
  addToCart: (p: Product, size: string) => void;
};

function Shop({ wishlist, toggleWishlist, addToCart }: ShopProps) {
  const stored = sessionStorage.getItem("category") || "All";
  const search = sessionStorage.getItem("search") || "";
  const [gender, setGender] = useState(
    stored === "Boys" || stored === "Girls" || stored === "Baby" ? stored : "All",
  );
  const [maxPrice, setMaxPrice] = useState(1600);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("Popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => {
    sessionStorage.removeItem("category");
    sessionStorage.removeItem("search");
  }, []);
  const result = useMemo(() => {
    let list = products.filter(
      (p) =>
        (gender === "All" || p.gender === gender) &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        (!search || p.name.toLowerCase().includes(search.toLowerCase())),
    );
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [gender, maxPrice, minRating, sort, search]);
  return (
    <main className="listing-page content-width">
      <div className="breadcrumbs">
        Home / Kids Clothing / <b>{gender === "All" ? "All Products" : gender}</b>
      </div>
      <div className="listing-head">
        <div>
          <h1>
            {search
              ? `Results for “${search}”`
              : gender === "All"
                ? "Kids Fashion"
                : `${gender}' Clothing`}
          </h1>
          <p>{result.length} products found</p>
        </div>
        <div className="sort-control">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option>Popular</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating</option>
          </select>
        </div>
        <button className="filter-mobile" onClick={() => setFiltersOpen(true)}>
          Filters
        </button>
      </div>
      <div className="listing-layout">
        <aside className={filtersOpen ? "filters open" : "filters"}>
          <div className="filter-title">
            <h3>Filters</h3>
            <button
              onClick={() => {
                setGender("All");
                setMaxPrice(1600);
                setMinRating(0);
              }}
            >
              Clear all
            </button>
            <button className="filter-close" onClick={() => setFiltersOpen(false)}>
              <Icon name="close" />
            </button>
          </div>
          <div className="filter-block">
            <h4>Gender</h4>
            {["All", "Boys", "Girls", "Baby"].map((x) => (
              <label key={x}>
                <input type="radio" checked={gender === x} onChange={() => setGender(x)} />{" "}
                <span>{x === "All" ? "All kids" : x}</span>
                <small>
                  {x === "All" ? products.length : products.filter((p) => p.gender === x).length}
                </small>
              </label>
            ))}
          </div>
          <div className="filter-block">
            <h4>Price</h4>
            <input
              className="range"
              type="range"
              min="300"
              max="1600"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="range-label">
              <span>₹0</span>
              <span>Up to ₹{maxPrice}</span>
            </div>
          </div>
          <div className="filter-block">
            <h4>Customer rating</h4>
            {[4, 3, 0].map((r) => (
              <label key={r}>
                <input type="radio" checked={minRating === r} onChange={() => setMinRating(r)} />
                <span>{r ? `${r}★ & above` : "All ratings"}</span>
              </label>
            ))}
          </div>
          <div className="filter-block">
            <h4>Discount</h4>
            {["50% or more", "40% or more", "30% or more"].map((x) => (
              <label key={x}>
                <input type="checkbox" />
                <span>{x}</span>
              </label>
            ))}
          </div>
          <button className="apply-filter" onClick={() => setFiltersOpen(false)}>
            Apply filters
          </button>
        </aside>
        <section className="listing-products">
          {result.length ? (
            <div className="product-grid grid-four">
              {result.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  wishlisted={wishlist.includes(p.id)}
                  onWishlist={() => toggleWishlist(p.id)}
                  onAdd={() => addToCart(p, p.sizes[0])}
                />
              ))}
            </div>
          ) : (
            <div className="empty">
              <span>⌕</span>
              <h2>No products found</h2>
              <p>Try changing your filters to see more styles.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function ProductPage({
  product,
  wishlist,
  toggleWishlist,
  addToCart,
}: ShopProps & { product: Product }) {
  const [size, setSize] = useState("");
  const [pin, setPin] = useState("");
  const [checked, setChecked] = useState(false);
  const [tab, setTab] = useState("Details");
  const off = Math.round((1 - product.price / product.mrp) * 100);
  return (
    <main className="product-page content-width">
      <div className="breadcrumbs">
        Home / {product.gender} / {product.category} / <b>{product.name}</b>
      </div>
      <div className="product-detail">
        <div className="product-gallery">
          <div className="thumbs">
            <button className="active">
              <img src={product.image} />
            </button>
            <button>
              <img src={product.image} />
            </button>
            <button>
              <img src={product.image} />
            </button>
          </div>
          <div className="main-product-image">
            <img src={product.image} alt={product.name} />
            <button
              className={`wish-button ${wishlist.includes(product.id) ? "active" : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              <Icon name="heart" />
            </button>
          </div>
        </div>
        <div className="product-info-detail">
          <p className="detail-brand">{product.brand}</p>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <Rating value={product.rating} />
            <span>{product.reviews} ratings & 46 reviews</span>
            <b>Assured Quality ✓</b>
          </div>
          <div className="special-price">Special price</div>
          <div className="big-price">
            <b>₹{product.price}</b>
            <del>₹{product.mrp}</del>
            <span>{off}% off</span>
          </div>
          <p className="tax-note">Inclusive of all taxes</p>
          <div className="offers">
            <h3>Available offers</h3>
            <p>
              <b>TAG</b>
              <span>
                <strong>Bank Offer</strong> 10% off on select bank credit cards
              </span>
            </p>
            <p>
              <b>TAG</b>
              <span>
                <strong>Special Price</strong> Get extra 10% off with code SUNDA10
              </span>
            </p>
            <p>
              <b>TAG</b>
              <span>
                <strong>Partner Offer</strong> Buy 3 or more and get ₹150 off
              </span>
            </p>
          </div>
          <div className="size-box">
            <div>
              <h3>Select size</h3>
              <button>Size guide</button>
            </div>
            <div>
              {product.sizes.map((s) => (
                <button className={size === s ? "selected" : ""} onClick={() => setSize(s)} key={s}>
                  {s}
                </button>
              ))}
            </div>
            {!size && <small>Please select a size before adding to cart</small>}
          </div>
          <div className="buy-actions">
            <button className="add-cart-button" onClick={() => size && addToCart(product, size)}>
              <Icon name="cart" /> Add to cart
            </button>
            <button
              className="buy-button"
              onClick={() => {
                if (size) {
                  addToCart(product, size);
                  go("checkout");
                }
              }}
            >
              Buy now <Icon name="arrow" />
            </button>
          </div>
          <div className="delivery-box">
            <h3>
              <Icon name="location" /> Delivery options
            </h3>
            <div>
              <input
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setChecked(false);
                }}
                maxLength={6}
                placeholder="Enter delivery pincode"
              />
              <button onClick={() => setChecked(pin.length === 6)}>Check</button>
            </div>
            {checked && (
              <p>
                <Icon name="check" /> Delivery by <b>Tuesday, 24 June</b> · Free
              </p>
            )}
          </div>
        </div>
      </div>
      <section className="product-tabs">
        <div>
          {["Details", "Specifications", "Ratings & Reviews"].map((x) => (
            <button key={x} className={tab === x ? "active" : ""} onClick={() => setTab(x)}>
              {x}
            </button>
          ))}
        </div>
        {tab === "Details" && (
          <p>
            Designed for movement and made for everyday joy. This style uses a soft, breathable
            cotton-rich fabric with neat finishing and a comfortable regular fit. Machine wash cold
            with similar colours.
          </p>
        )}
        {tab === "Specifications" && (
          <dl>
            <div>
              <dt>Fabric</dt>
              <dd>Cotton blend</dd>
            </div>
            <div>
              <dt>Fit</dt>
              <dd>Regular fit</dd>
            </div>
            <div>
              <dt>Occasion</dt>
              <dd>Casual</dd>
            </div>
            <div>
              <dt>Country of Origin</dt>
              <dd>India</dd>
            </div>
          </dl>
        )}
        {tab === "Ratings & Reviews" && (
          <div className="review-block">
            <b>{product.rating} ★</b>
            <span>Based on {product.reviews} verified ratings</span>
            <p>“Great quality and colour. My child loved it!” — Verified buyer</p>
          </div>
        )}
      </section>
      <section className="similar">
        <div className="section-title">
          <div>
            <h2>You may also like</h2>
            <p>Similar picks for your little one</p>
          </div>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 5)
            .map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                wishlisted={wishlist.includes(p.id)}
                onWishlist={() => toggleWishlist(p.id)}
                onAdd={() => addToCart(p, p.sizes[0])}
              />
            ))}
        </div>
      </section>
    </main>
  );
}

function Cart({
  cart,
  setCart,
}: {
  cart: CartLine[];
  setCart: React.Dispatch<React.SetStateAction<CartLine[]>>;
}) {
  const subtotal = cart.reduce((s, x) => s + x.product.price * x.qty, 0);
  const mrp = cart.reduce((s, x) => s + x.product.mrp * x.qty, 0);
  const update = (id: number, qty: number) =>
    setCart((c) => c.map((x) => (x.product.id === id ? { ...x, qty: Math.max(1, qty) } : x)));
  return (
    <main className="cart-page content-width">
      <div className="stepper">
        <span className="active">
          1 <b>Bag</b>
        </span>
        <i></i>
        <span>
          2 <b>Address</b>
        </span>
        <i></i>
        <span>
          3 <b>Payment</b>
        </span>
      </div>
      {cart.length === 0 ? (
        <Empty
          title="Your cart is empty"
          text="Add items to it now and make your little one smile."
          action="Shop now"
          onClick={() => go("shop")}
        />
      ) : (
        <div className="cart-layout">
          <section>
            <div className="cart-address">
              <span>
                <Icon name="location" />
                <b>Deliver to: Ahmedabad 380001</b>
              </span>
              <button>Change</button>
            </div>
            <div className="cart-list">
              {cart.map(({ product, qty, size }) => (
                <article key={product.id}>
                  <img src={product.image} alt="" />
                  <div>
                    <p>{product.brand}</p>
                    <h3>{product.name}</h3>
                    <small>
                      Size: {size} · {product.color}
                    </small>
                    <span className="line-price">
                      <b>₹{product.price}</b>
                      <del>₹{product.mrp}</del>
                      <em>{Math.round((1 - product.price / product.mrp) * 100)}% off</em>
                    </span>
                    <div className="qty-control">
                      <button onClick={() => update(product.id, qty - 1)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => update(product.id, qty + 1)}>+</button>
                    </div>
                    <div className="cart-line-actions">
                      <button
                        onClick={() => setCart((c) => c.filter((x) => x.product.id !== product.id))}
                      >
                        Remove
                      </button>
                      <button>Save for later</button>
                    </div>
                  </div>
                  <b className="delivery-note">
                    Delivery by Tue
                    <br />
                    <small>FREE</small>
                  </b>
                </article>
              ))}
            </div>
          </section>
          <PriceBox mrp={mrp} subtotal={subtotal} onContinue={() => go("checkout")} />
        </div>
      )}
    </main>
  );
}

function PriceBox({
  mrp,
  subtotal,
  onContinue,
}: {
  mrp: number;
  subtotal: number;
  onContinue: () => void;
}) {
  return (
    <aside className="price-box">
      <h3>Price details</h3>
      <div>
        <span>Price</span>
        <b>₹{mrp}</b>
      </div>
      <div>
        <span>Discount</span>
        <b className="green">− ₹{mrp - subtotal}</b>
      </div>
      <div>
        <span>Delivery charges</span>
        <b className="green">FREE</b>
      </div>
      <div className="total">
        <span>Total amount</span>
        <b>₹{subtotal}</b>
      </div>
      <p>You will save ₹{mrp - subtotal} on this order</p>
      <button onClick={onContinue}>
        Place order <Icon name="arrow" />
      </button>
      <small>
        <Icon name="shield" /> Safe and secure payments. Easy returns.
      </small>
    </aside>
  );
}

function Checkout({ cart, onSuccess }: { cart: CartLine[]; onSuccess: () => void }) {
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("UPI");
  const subtotal = cart.reduce((s, x) => s + x.product.price * x.qty, 0);
  if (!cart.length)
    return (
      <main className="content-width">
        <Empty
          title="Nothing to checkout"
          text="Your cart is currently empty."
          action="Start shopping"
          onClick={() => go("shop")}
        />
      </main>
    );
  return (
    <main className="checkout-page content-width">
      <div className="checkout-main">
        <section className="checkout-section">
          <div className="checkout-number">1</div>
          <div className="checkout-content">
            <h3>
              Login details <span>✓</span>
            </h3>
            <p>Guest customer · +91 98XXXXXX21</p>
          </div>
        </section>
        <section className={`checkout-section ${step === 1 ? "current" : ""}`}>
          <div className="checkout-number">2</div>
          <div className="checkout-content">
            <h3>Delivery address</h3>
            {step === 1 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep(2);
                }}
                className="address-form"
              >
                <div>
                  <label>
                    Full name
                    <input required placeholder="Your name" />
                  </label>
                  <label>
                    Mobile number
                    <input required placeholder="10-digit mobile number" />
                  </label>
                </div>
                <label>
                  Address
                  <textarea required placeholder="House no., building, street, area" />
                </label>
                <div>
                  <label>
                    City
                    <input required placeholder="City" />
                  </label>
                  <label>
                    PIN code
                    <input required maxLength={6} placeholder="6-digit PIN" />
                  </label>
                </div>
                <button>Save and deliver here</button>
              </form>
            ) : (
              <p>
                Home · Ahmedabad, Gujarat 380001 <button onClick={() => setStep(1)}>Change</button>
              </p>
            )}
          </div>
        </section>
        <section className={`checkout-section ${step === 2 ? "current" : ""}`}>
          <div className="checkout-number">3</div>
          <div className="checkout-content">
            <h3>Payment options</h3>
            {step === 2 && (
              <div className="payment-options">
                {["UPI", "Credit / Debit Card", "Cash on Delivery"].map((x) => (
                  <label key={x}>
                    <input type="radio" checked={payment === x} onChange={() => setPayment(x)} />
                    <span>
                      <b>{x}</b>
                      <small>
                        {x === "UPI"
                          ? "Google Pay, PhonePe, Paytm and more"
                          : x === "Cash on Delivery"
                            ? "Pay when your order arrives"
                            : "Visa, Mastercard, RuPay"}
                      </small>
                    </span>
                  </label>
                ))}
                <button onClick={onSuccess}>Pay ₹{subtotal} securely</button>
              </div>
            )}
          </div>
        </section>
      </div>
      <PriceBox
        mrp={subtotal + 500}
        subtotal={subtotal}
        onContinue={() => (step === 1 ? undefined : onSuccess())}
      />
    </main>
  );
}

function Empty({
  title,
  text,
  action,
  onClick,
}: {
  title: string;
  text: string;
  action: string;
  onClick: () => void;
}) {
  return (
    <div className="empty-page">
      <span>◌</span>
      <h2>{title}</h2>
      <p>{text}</p>
      <button onClick={onClick}>{action}</button>
    </div>
  );
}

function Wishlist({
  ids,
  toggle,
  addToCart,
}: {
  ids: number[];
  toggle: (id: number) => void;
  addToCart: (p: Product, size: string) => void;
}) {
  const list = products.filter((p) => ids.includes(p.id));
  return (
    <main className="wishlist-page content-width">
      <div className="page-heading">
        <h1>My Wishlist</h1>
        <p>{list.length} saved styles</p>
      </div>
      {list.length ? (
        <div className="product-grid grid-four">
          {list.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              wishlisted
              onWishlist={() => toggle(p.id)}
              onAdd={() => addToCart(p, p.sizes[0])}
            />
          ))}
        </div>
      ) : (
        <Empty
          title="Your wishlist is empty"
          text="Save the styles you love and find them here later."
          action="Discover products"
          onClick={() => go("shop")}
        />
      )}
    </main>
  );
}

function Wholesale() {
  const [done, setDone] = useState(false);
  return (
    <main>
      <section className="wholesale-hero">
        <div>
          <span>WHOLESALE KIDS WEAR · AHMEDABAD</span>
          <h1>
            Good fashion.
            <br />
            <em>Better business.</em>
          </h1>
          <p>
            Fresh designs, reliable quality and direct wholesale prices for retailers across India.
          </p>
          <button onClick={() => document.getElementById("enquiry")?.scrollIntoView()}>
            Get the catalogue <Icon name="arrow" />
          </button>
        </div>
        <div>
          <b>6+</b>
          <span>pieces per style</span>
          <b>13+</b>
          <span>kidswear categories</span>
          <b>Pan India</b>
          <span>delivery available</span>
        </div>
      </section>
      <section className="wholesale-body content-width">
        <div>
          <span className="section-tag">WHY PARTNER WITH US</span>
          <h2>
            Made for children.
            <br />
            Built for retailers.
          </h2>
          <p>
            Sunda Original brings you a complete range of western kidswear and ladies’ wear, backed
            by dependable service and transparent pricing.
          </p>
          <ul>
            <li>
              <Icon name="check" /> Direct manufacturer pricing
            </li>
            <li>
              <Icon name="check" /> New designs added regularly
            </li>
            <li>
              <Icon name="check" /> Support over WhatsApp
            </li>
            <li>
              <Icon name="check" /> Nationwide dispatch
            </li>
          </ul>
          <div className="store-detail">
            <b>Visit our store</b>
            <p>
              22/A, Ground Floor, Mahalaxmi Complex, Nr. Gheekanta Police Chowki, Ahmedabad 380001
            </p>
            <a href="tel:+919427961980">+91 94279 61980</a>
          </div>
        </div>
        <form
          id="enquiry"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <span className="section-tag">WHOLESALE ENQUIRY</span>
          <h2>{done ? "We’ll be in touch!" : "Tell us about your store"}</h2>
          {done ? (
            <div className="form-success">
              <Icon name="check" />
              <p>Thanks for your interest. Our wholesale team will contact you shortly.</p>
            </div>
          ) : (
            <>
              <label>
                Your name
                <input required placeholder="Full name" />
              </label>
              <label>
                Business name
                <input required placeholder="Store or company" />
              </label>
              <div>
                <label>
                  Phone number
                  <input required placeholder="+91" />
                </label>
                <label>
                  City
                  <input required placeholder="Your city" />
                </label>
              </div>
              <label>
                What do you sell?
                <select>
                  <option>Kidswear</option>
                  <option>Multi-brand fashion</option>
                  <option>Online retail</option>
                  <option>Other</option>
                </select>
              </label>
              <button>
                Request wholesale catalogue <Icon name="arrow" />
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

function LoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [otp, setOtp] = useState(false);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div className="login-modal" onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <Icon name="close" />
        </button>
        <div className="login-art">
          <Logo />
          <h2>Looks like you’re new here!</h2>
          <p>Sign in to track orders, save your wishlist and get personalised offers.</p>
          <span>Fashion for every child ♥</span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (otp) onSuccess();
            else setOtp(true);
          }}
        >
          <h2>{otp ? "Enter verification code" : "Login or sign up"}</h2>
          <p>
            {otp
              ? "We sent a 6-digit OTP to your mobile number."
              : "Enter your mobile number to continue."}
          </p>
          <label>
            {otp ? "OTP" : "Mobile number"}
            <input
              required
              maxLength={otp ? 6 : 10}
              placeholder={otp ? "• • • • • •" : "+91  Enter mobile number"}
            />
          </label>
          <small>By continuing, you agree to Sunda’s Terms of Use and Privacy Policy.</small>
          <button>{otp ? "Verify & continue" : "Request OTP"}</button>
          {otp && <a onClick={() => setOtp(false)}>Change mobile number</a>}
        </form>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main content-width">
        <div>
          <Logo />
          <p>Joyful, comfortable kidswear for every little adventure. Proudly made in India.</p>
          <div className="socials">
            <span>f</span>
            <span>in</span>
            <span>◎</span>
          </div>
        </div>
        <div>
          <h4>About</h4>
          <button onClick={() => go("wholesale")}>Our story</button>
          <button onClick={() => go("wholesale")}>Wholesale</button>
          <button>Careers</button>
          <button>Contact us</button>
        </div>
        <div>
          <h4>Help</h4>
          <button>Payments</button>
          <button>Shipping</button>
          <button>Returns</button>
          <button>FAQ</button>
        </div>
        <div>
          <h4>Policies</h4>
          <button>Terms of use</button>
          <button>Privacy</button>
          <button>Returns policy</button>
          <button>Security</button>
        </div>
        <div>
          <h4>Registered office</h4>
          <p>
            22/A, Ground Floor, Mahalaxmi Complex, Nr. Gheekanta Police Chowki, Ahmedabad 380001
          </p>
          <p>GSTIN: 24AJPPD5448P1ZN</p>
        </div>
      </div>
      <div className="footer-bottom content-width">
        <span>Sell with us</span>
        <span>Gift cards</span>
        <span>Help center</span>
        <span>© 2025 Sunda Original</span>
        <b>Secure payments: VISA · Mastercard · UPI</b>
      </div>
    </footer>
  );
}

export default function App() {
  const [path, setPath] = useState(location.pathname);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [login, setLogin] = useState(false);
  const [toast, setToast] = useState("");
  const [orderDone, setOrderDone] = useState(false);
  useEffect(() => {
    const update = () => setPath(location.pathname);
    addEventListener("popstate", update);
    return () => removeEventListener("popstate", update);
  }, []);
  const notify = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(""), 2200);
  };
  const addToCart = (product: Product, size: string) => {
    setCart((c) =>
      c.some((x) => x.product.id === product.id)
        ? c.map((x) => (x.product.id === product.id ? { ...x, qty: x.qty + 1 } : x))
        : [...c, { product, qty: 1, size }],
    );
    notify("Added to cart");
  };
  const toggleWishlist = (id: number) => {
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));
    notify(wishlist.includes(id) ? "Removed from wishlist" : "Saved to wishlist");
  };
  let page: React.ReactNode = (
    <Home wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />
  );
  if (path === "/shop")
    page = <Shop wishlist={wishlist} toggleWishlist={toggleWishlist} addToCart={addToCart} />;
  if (path.startsWith("/product/"))
    page = (
      <ProductPage
        product={products.find((p) => p.id === Number(path.split("/").pop())) || products[0]}
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
        addToCart={addToCart}
      />
    );
  if (path === "/cart") page = <Cart cart={cart} setCart={setCart} />;
  if (path === "/wishlist")
    page = <Wishlist ids={wishlist} toggle={toggleWishlist} addToCart={addToCart} />;
  if (path === "/wholesale") page = <Wholesale />;
  if (path === "/checkout")
    page = orderDone ? (
      <main className="content-width">
        <div className="order-success">
          <span>
            <Icon name="check" />
          </span>
          <h1>Order placed successfully!</h1>
          <p>
            Your demo order <b>#SUNDA240625</b> has been confirmed. We’ll send tracking updates to
            your mobile.
          </p>
          <button
            onClick={() => {
              setOrderDone(false);
              setCart([]);
              go("home");
            }}
          >
            Continue shopping
          </button>
        </div>
      </main>
    ) : (
      <Checkout cart={cart} onSuccess={() => setOrderDone(true)} />
    );
  return (
    <>
      <Header
        cartCount={cart.reduce((s, x) => s + x.qty, 0)}
        wishlistCount={wishlist.length}
        onLogin={() => setLogin(true)}
      />
      {page}
      <Footer />
      <LoginModal
        open={login}
        onClose={() => setLogin(false)}
        onSuccess={() => {
          setLogin(false);
          notify("Welcome to Sunda Original");
        }}
      />
      {toast && (
        <div className="toast">
          <Icon name="check" />
          {toast}
        </div>
      )}
    </>
  );
}
