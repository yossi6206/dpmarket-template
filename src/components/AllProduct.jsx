"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const AllProduct = () => {
  const [activeButton, setActiveButton] = useState("grid-view");
  const [filter, setFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [selectedCategory, sortBy]);

  const fetchProducts = async () => {
    setLoading(true);
    const supabase = createClient();
    
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(id, name, slug),
        seller:profiles(id, username, full_name, avatar_url)
      `)
      .eq('is_active', true);

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    switch (sortBy) {
      case 'price_low':
        query = query.order('price', { ascending: true });
        break;
      case 'price_high':
        query = query.order('price', { ascending: false });
        break;
      case 'popular':
        query = query.order('sales_count', { ascending: false });
        break;
      case 'rating':
        query = query.order('rating_average', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (!error) {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order');
    
    setCategories(data || []);
  };

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleFilter = () => {
    setFilter(!filter);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <li key={i} className="star-rating__item font-11">
          <i className={`fas fa-star ${i < fullStars ? '' : 'text-muted'}`} />
        </li>
      );
    }
    return stars;
  };

  return (
    <section className={`all-product padding-y-120 ${activeButton === "list-view" ? "list-view" : ""}`}>
      <div className="container container-two">
        <div className="row">
          <div className="col-lg-12">
            <div className="filter-tab gap-3 flx-between">
              <button
                type="button"
                className="filter-tab__button btn btn-outline-light pill d-flex align-items-center"
                onClick={handleFilter}
              >
                <span className="icon icon-left">
                  <img src="assets/images/icons/filter.svg" alt="" />
                </span>
                <span className="font-18 fw-500">סינון</span>
              </button>
              
              <ul className="nav common-tab nav-pills mb-0 gap-lg-2 gap-1" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sortBy === 'newest' ? 'active' : ''}`}
                    onClick={() => setSortBy('newest')}
                    type="button"
                  >
                    חדש ביותר
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sortBy === 'popular' ? 'active' : ''}`}
                    onClick={() => setSortBy('popular')}
                    type="button"
                  >
                    פופולרי
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sortBy === 'rating' ? 'active' : ''}`}
                    onClick={() => setSortBy('rating')}
                    type="button"
                  >
                    דירוג הכי טוב
                  </button>
                </li>
              </ul>

              <div className="list-grid d-flex align-items-center gap-2">
                <button
                  onClick={() => handleClick("grid-view")}
                  className={`list-grid__button grid-button ${activeButton === "grid-view" ? "active" : ""}`}
                >
                  <img src="assets/images/icons/grid-view.svg" alt="" className="white-version" />
                  <img src="assets/images/icons/grid-white.svg" alt="" className="dark-version" />
                </button>
                <button
                  onClick={() => handleClick("list-view")}
                  className={`list-grid__button list-button ${activeButton === "list-view" ? "active" : ""}`}
                >
                  <img src="assets/images/icons/list-view.svg" alt="" className="white-version" />
                  <img src="assets/images/icons/list-white.svg" alt="" className="dark-version" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="row gy-4 mt-4">
          {/* Sidebar */}
          <div className="col-xl-3">
            <div className={`responsive-filter-card ${filter ? 'active' : ''}`}>
              <div className="responsive-filter-card__header flx-between">
                <h6 className="mb-0">סינון</h6>
                <button type="button" className="close-btn text-body" onClick={handleFilter}>
                  <i className="las la-times"></i>
                </button>
              </div>
              
              <div className="search-box mb-4">
                <input
                  type="text"
                  className="common-input common-input--bg"
                  placeholder="חיפוש מוצרים..."
                />
              </div>

              <div className="filter-card mb-4">
                <div className="filter-card__header">
                  <h6 className="filter-card__title mb-0">קטגוריות</h6>
                </div>
                <div className="filter-card__body">
                  <ul className="filter-category-list">
                    <li className={`filter-category-list__item ${!selectedCategory ? 'active' : ''}`}>
                      <button 
                        type="button"
                        className="filter-category-list__button"
                        onClick={() => setSelectedCategory(null)}
                      >
                        כל הקטגוריות
                        <span className="qty">{products.length}</span>
                      </button>
                    </li>
                    {categories.map(cat => (
                      <li 
                        key={cat.id} 
                        className={`filter-category-list__item ${selectedCategory === cat.id ? 'active' : ''}`}
                      >
                        <button 
                          type="button"
                          className="filter-category-list__button"
                          onClick={() => setSelectedCategory(cat.id)}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="col-xl-9">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">טוען...</span>
                </div>
                <p className="mt-3">טוען מוצרים...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-5">
                <img src="assets/images/icons/empty-box.svg" alt="" style={{ width: '100px', opacity: 0.5 }} />
                <h5 className="mt-4">אין מוצרים להצגה</h5>
                <p className="text-muted">לא נמצאו מוצרים בקטגוריה זו</p>
                <Link href="/add-product" className="btn btn-main pill mt-3">
                  הוסף מוצר ראשון
                </Link>
              </div>
            ) : (
              <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-product">
                  <div className="row gy-4">
                    {products.map((product) => (
                      <div key={product.id} className="col-xl-4 col-sm-6">
                        <div className="product-item shadow-sm">
                          <div className="product-item__thumb d-flex">
                            <Link href={`/product-details?id=${product.id}`} className="link w-100">
                              <img
                                src={product.thumbnail_url || "assets/images/thumbs/product-img1.png"}
                                alt={product.title}
                                className="cover-img"
                              />
                            </Link>
                            <button type="button" className="product-item__wishlist">
                              <i className="fas fa-heart" />
                            </button>
                          </div>
                          <div className="product-item__content">
                            <h6 className="product-item__title">
                              <Link href={`/product-details?id=${product.id}`} className="link">
                                {product.title}
                              </Link>
                            </h6>
                            <div className="product-item__info flx-between gap-2">
                              <span className="product-item__author">
                                מאת{" "}
                                <Link href={`/profile?id=${product.seller?.id}`} className="link hover-text-decoration-underline">
                                  {product.seller?.full_name || product.seller?.username || 'מוכר'}
                                </Link>
                              </span>
                              <div className="flx-align gap-2">
                                {product.sale_price ? (
                                  <>
                                    <h6 className="product-item__price mb-0">₪{product.sale_price}</h6>
                                    <span className="product-item__prevPrice text-decoration-line-through">
                                      ₪{product.price}
                                    </span>
                                  </>
                                ) : (
                                  <h6 className="product-item__price mb-0">₪{product.price}</h6>
                                )}
                              </div>
                            </div>
                            <div className="product-item__bottom flx-between gap-2">
                              <div>
                                <span className="product-item__sales font-14 mb-2">
                                  {product.sales_count || 0} מכירות
                                </span>
                                <div className="d-flex align-items-center gap-1">
                                  <ul className="star-rating">
                                    {renderStars(product.rating_average)}
                                  </ul>
                                  <span className="star-rating__text text-heading fw-500 font-14">
                                    ({product.rating_count || 0})
                                  </span>
                                </div>
                              </div>
                              {product.demo_url ? (
                                <a
                                  href={product.demo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-outline-light btn-sm pill"
                                >
                                  צפה בהדגמה
                                </a>
                              ) : (
                                <Link
                                  href={`/product-details?id=${product.id}`}
                                  className="btn btn-outline-light btn-sm pill"
                                >
                                  פרטים
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
