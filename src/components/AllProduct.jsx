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
  const [sortBy, setSortBy] = useState('all');
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy, searchTag]);

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

    if (searchTag) {
      query = query.or(`title.ilike.%${searchTag}%,description.ilike.%${searchTag}%`);
    }

    switch (sortBy) {
      case 'best_match':
        query = query.order('views_count', { ascending: false });
        break;
      case 'best_rating':
        query = query.order('rating_average', { ascending: false });
        break;
      case 'best_selling':
        query = query.order('sales_count', { ascending: false });
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
              <ul
                className="nav common-tab nav-pills mb-0 gap-lg-2 gap-1 ms-lg-auto"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sortBy === 'all' ? 'active' : ''}`}
                    onClick={() => setSortBy('all')}
                    type="button"
                  >
                    כל הפריטים
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sortBy === 'best_match' ? 'active' : ''}`}
                    onClick={() => setSortBy('best_match')}
                    type="button"
                  >
                    התאמה מושלמת
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sortBy === 'best_rating' ? 'active' : ''}`}
                    onClick={() => setSortBy('best_rating')}
                    type="button"
                  >
                    דירוג הכי טוב
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${sortBy === 'best_selling' ? 'active' : ''}`}
                    onClick={() => setSortBy('best_selling')}
                    type="button"
                  >
                    הנמכרים ביותר
                  </button>
                </li>
              </ul>
              <div className="list-grid d-flex align-items-center gap-2">
                <button
                  className={`list-grid__button list-button d-sm-flex d-none text-body ${activeButton === "list-view" ? "active" : ""}`}
                  onClick={() => handleClick("list-view")}
                >
                  <i className="las la-list" />
                </button>
                <button
                  className={`list-grid__button grid-button d-sm-flex d-none text-body ${activeButton === "grid-view" ? "active" : ""}`}
                  onClick={() => handleClick("grid-view")}
                >
                  <i className="las la-border-all" />
                </button>
                <button className="list-grid__button sidebar-btn text-body d-lg-none d-flex" onClick={handleFilter}>
                  <i className="las la-bars" />
                </button>
              </div>
            </div>
            <form action="#" className="filter-form pb-4 d-block">
              <div className="row gy-3">
                <div className="col-sm-4 col-xs-6">
                  <div className="flx-between gap-1">
                    <label htmlFor="tag" className="form-label font-16">
                      חיפוש
                    </label>
                    <button type="button" className="text-body font-14" onClick={() => setSearchTag('')}>
                      נקה
                    </button>
                  </div>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="common-input border-gray-five common-input--withLeftIcon"
                      id="tag"
                      placeholder="חפש לפי שם..."
                      value={searchTag}
                      onChange={(e) => setSearchTag(e.target.value)}
                    />
                    <span className="input-icon input-icon--left">
                      <img src="assets/images/icons/search-two.svg" alt="" />
                    </span>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Filter Sidebar */}
          <div className="col-xl-3 col-lg-4">
            <div className={`filter-sidebar ${filter ? "show" : ""}`}>
              <button
                type="button"
                className="filter-sidebar__close p-2 position-absolute end-0 top-0 z-index-1 text-body hover-text-main font-20 d-lg-none d-block"
                onClick={handleFilter}
              >
                <i className="las la-times" />
              </button>
              <div className="filter-sidebar__item">
                <button
                  type="button"
                  className="filter-sidebar__button font-16 text-capitalize fw-500"
                >
                  קטגוריה
                </button>
                <div className="filter-sidebar__content">
                  <ul className="filter-sidebar-list">
                    <li className="filter-sidebar-list__item">
                      <button 
                        type="button"
                        className={`filter-sidebar-list__text ${!selectedCategory ? 'active text-main' : ''}`}
                        onClick={() => setSelectedCategory(null)}
                        style={{ background: 'none', border: 'none', width: '100%', textAlign: 'right', cursor: 'pointer' }}
                      >
                        כל הקטגוריות <span className="qty">{products.length}</span>
                      </button>
                    </li>
                    {categories.map(cat => (
                      <li key={cat.id} className="filter-sidebar-list__item">
                        <button 
                          type="button"
                          className={`filter-sidebar-list__text ${selectedCategory === cat.id ? 'active text-main' : ''}`}
                          onClick={() => setSelectedCategory(cat.id)}
                          style={{ background: 'none', border: 'none', width: '100%', textAlign: 'right', cursor: 'pointer' }}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="filter-sidebar__item">
                <button
                  type="button"
                  className="filter-sidebar__button font-16 text-capitalize fw-500"
                >
                  דירוג
                </button>
                <div className="filter-sidebar__content">
                  <ul className="filter-sidebar-list">
                    <li className="filter-sidebar-list__item">
                      <div className="filter-sidebar-list__text">
                        <div className="common-check">
                          <input className="form-check-input" type="checkbox" id="show5star" />
                          <label className="form-check-label" htmlFor="show5star">
                            הצג 5 כוכבים בלבד
                          </label>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="col-xl-9 col-lg-8">
            <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade show active">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">טוען...</span>
                    </div>
                    <p className="mt-3">טוען מוצרים...</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-5">
                    <h5 className="mt-4">אין מוצרים להצגה</h5>
                    <p className="text-muted">לא נמצאו מוצרים</p>
                    <Link href="/add-product" className="btn btn-main pill mt-3">
                      הוסף מוצר ראשון
                    </Link>
                  </div>
                ) : (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllProduct;
