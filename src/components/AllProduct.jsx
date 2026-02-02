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

    // Sorting
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 0
    }).format(price);
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
              
              <div className="d-flex align-items-center gap-3">
                <select 
                  className="form-select common-input common-input--sm"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ width: 'auto' }}
                >
                  <option value="newest">חדש ביותר</option>
                  <option value="popular">פופולרי</option>
                  <option value="price_low">מחיר: נמוך לגבוה</option>
                  <option value="price_high">מחיר: גבוה לנמוך</option>
                  <option value="rating">דירוג</option>
                </select>

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
        </div>

        <div className="row mt-4">
          {/* Sidebar Filter */}
          <div className={`col-lg-3 ${filter ? 'd-block' : 'd-none d-lg-block'}`}>
            <div className="filter-sidebar">
              <div className="filter-sidebar__item">
                <h6 className="filter-sidebar__title">קטגוריות</h6>
                <ul className="filter-sidebar__list">
                  <li>
                    <button 
                      className={`filter-sidebar__link ${!selectedCategory ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(null)}
                    >
                      כל הקטגוריות
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <button 
                        className={`filter-sidebar__link ${selectedCategory === cat.id ? 'active' : ''}`}
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

          {/* Products Grid */}
          <div className="col-lg-9">
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
              <div className="row gy-4">
                {products.map((product) => (
                  <div key={product.id} className="col-lg-4 col-sm-6">
                    <div className="product-item">
                      <div className="product-item__thumb d-flex">
                        <Link href={`/product-details?id=${product.id}`} className="link w-100">
                          <img
                            src={product.thumbnail_url || "assets/images/thumbs/product-img1.png"}
                            alt={product.title}
                            className="cover-img"
                          />
                        </Link>
                        <button
                          type="button"
                          className="product-item__wishlist"
                        >
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
                          <span className="product-item__tag">
                            {product.category?.name || 'כללי'}
                          </span>
                          <div className="flx-align gap-2">
                            <span className="product-item__rating flx-align gap-1">
                              <i className="fas fa-star" />
                              {product.rating_average?.toFixed(1) || '0.0'}
                            </span>
                            <span className="product-item__sales">
                              ({product.sales_count || 0} מכירות)
                            </span>
                          </div>
                        </div>

                        {product.short_description && (
                          <p className="product-item__desc mt-2 text-muted font-14">
                            {product.short_description.substring(0, 80)}...
                          </p>
                        )}

                        <div className="product-item__bottom flx-between gap-2 mt-3">
                          <div className="author-info flx-align gap-2">
                            <div className="author-info__thumb">
                              <img
                                src={product.seller?.avatar_url || "assets/images/thumbs/user-profile.png"}
                                alt={product.seller?.full_name}
                              />
                            </div>
                            <span className="author-info__name font-14">
                              {product.seller?.full_name || product.seller?.username || 'מוכר'}
                            </span>
                          </div>
                          <div className="product-item__price">
                            {product.sale_price ? (
                              <>
                                <span className="product-item__price--old">
                                  {formatPrice(product.price)}
                                </span>
                                <span className="product-item__price--new">
                                  {formatPrice(product.sale_price)}
                                </span>
                              </>
                            ) : (
                              <span className="product-item__price--new">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
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

      <style jsx>{`
        .filter-sidebar__link {
          background: none;
          border: none;
          padding: 8px 0;
          cursor: pointer;
          color: inherit;
          text-align: right;
          width: 100%;
          transition: color 0.3s;
        }
        .filter-sidebar__link:hover,
        .filter-sidebar__link.active {
          color: var(--main-color, #5a4bda);
          font-weight: 600;
        }
        .product-item__price--old {
          text-decoration: line-through;
          color: #999;
          font-size: 14px;
          margin-left: 8px;
        }
        .product-item__price--new {
          color: var(--main-color, #5a4bda);
          font-weight: 700;
          font-size: 18px;
        }
      `}</style>
    </section>
  );
};

export default AllProduct;
