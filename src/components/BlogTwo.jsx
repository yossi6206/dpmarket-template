import Link from "next/link";

const BlogTwo = () => {
  return (
    <section className="article padding-y-120">
      <div className="container container-two">
        <div className="section-heading style-left style-flex flx-between align-items-end gap-3">
          <div className="section-heading__inner">
            <h3 className="section-heading__title">
              עיינו בכל המאמרים והבלוגים האחרונים
            </h3>
          </div>
          <Link scroll={false} href="/blog" className="btn btn-outline-light btn-lg pill">
            לכל המאמרים
          </Link>
        </div>
        <div className="article-item-wrapper">
          <div className="article-item">
            <div className="article-item__inner d-flex position-relative">
              <div className="article-item__start">
                <div className="user-info">
                  <div className="user-info__thumb">
                    <img src="assets/images/thumbs/user-info-img1.png" alt="" />
                  </div>
                  <span className="user-info__text mt-2 mb-1 font-14 text-heading">
                    פורסם על ידי
                  </span>
                  <h6 className="user-info__name font-16 font-body fw-600 mb-0">
                    Ralph Edwards
                  </h6>
                </div>
              </div>
              <div className="article-item__center d-flex align-items-center">
                <div className="article-item__content">
                  <div className="article-item__top flx-align">
                    <Link scroll={false} href="/blog" className="article-item__tag font-14">
                      סטארטאפ
                    </Link>
                    <Link scroll={false} href="/blog" className="article-item__tag font-14">
                      שיווק
                    </Link>
                    <span className="text-heading font-16 fw-500">
                      June 24, 2024
                    </span>
                  </div>
                  <h4 className="article-item__title mb-3">
                    <Link scroll={false} href="/blog-details" className="link">
                      תובנות מבוססות נתונים פותחות פוטנציאל נסתר
                    </Link>
                  </h4>
                  <p className="article-item__desc">
                    גלו כיצד להפוך נתונים לתובנות עסקיות בעלות ערך. 
                    טיפים ושיטות מוכחות להצלחה...
                  </p>
                </div>
                <div className="article-item__thumb">
                  <img src="assets/images/thumbs/blog1.png" alt="" />
                </div>
              </div>
            </div>
            <div className="article-item__end flex-shrink-0">
              <Link scroll={false} href="/blog-details" className="btn-simple">
                קרא עוד
                <span className="icon font-26">
                  <i className="las la-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
          <div className="article-item">
            <div className="article-item__inner d-flex position-relative">
              <div className="article-item__start">
                <div className="user-info">
                  <div className="user-info__thumb">
                    <img src="assets/images/thumbs/user-info-img2.png" alt="" />
                  </div>
                  <span className="user-info__text mt-2 mb-1 font-14 text-heading">
                    פורסם על ידי
                  </span>
                  <h6 className="user-info__name font-16 font-body fw-600 mb-0">
                    Jacob Jones
                  </h6>
                </div>
              </div>
              <div className="article-item__center d-flex align-items-center">
                <div className="article-item__content">
                  <div className="article-item__top flx-align">
                    <Link scroll={false} href="/blog" className="article-item__tag font-14">
                      סטארטאפ
                    </Link>
                    <Link scroll={false} href="/blog" className="article-item__tag font-14">
                      שיווק
                    </Link>
                    <span className="text-heading font-16 fw-500">
                      June 24, 2024
                    </span>
                  </div>
                  <h4 className="article-item__title mb-3">
                    <Link scroll={false} href="/blog-details" className="link">
                      אנו מציעים את ההדרכה הטובה ביותר ליחידים וצוותים
                    </Link>
                  </h4>
                  <p className="article-item__desc">
                    גלו כיצד להפוך נתונים לתובנות עסקיות בעלות ערך. 
                    טיפים ושיטות מוכחות להצלחה...
                  </p>
                </div>
                <div className="article-item__thumb">
                  <img src="assets/images/thumbs/blog2.png" alt="" />
                </div>
              </div>
            </div>
            <div className="article-item__end flex-shrink-0">
              <Link scroll={false} href="/blog-details" className="btn-simple">
                קרא עוד
                <span className="icon font-26">
                  <i className="las la-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
          <div className="article-item">
            <div className="article-item__inner d-flex position-relative">
              <div className="article-item__start">
                <div className="user-info">
                  <div className="user-info__thumb">
                    <img src="assets/images/thumbs/user-info-img1.png" alt="" />
                  </div>
                  <span className="user-info__text mt-2 mb-1 font-14 text-heading">
                    פורסם על ידי
                  </span>
                  <h6 className="user-info__name font-16 font-body fw-600 mb-0">
                    Jenny Wilson
                  </h6>
                </div>
              </div>
              <div className="article-item__center d-flex align-items-center">
                <div className="article-item__content">
                  <div className="article-item__top flx-align">
                    <Link scroll={false} href="/blog" className="article-item__tag font-14">
                      סטארטאפ
                    </Link>
                    <Link scroll={false} href="/blog" className="article-item__tag font-14">
                      שיווק
                    </Link>
                    <span className="text-heading font-16 fw-500">
                      June 24, 2024
                    </span>
                  </div>
                  <h4 className="article-item__title mb-3">
                    <Link scroll={false} href="/blog-details" className="link">
                      תכונת האנליטיקס היא כמו לקבל יועץ אישי.
                    </Link>
                  </h4>
                  <p className="article-item__desc">
                    גלו כיצד להפוך נתונים לתובנות עסקיות בעלות ערך. 
                    טיפים ושיטות מוכחות להצלחה...
                  </p>
                </div>
                <div className="article-item__thumb">
                  <img src="assets/images/thumbs/blog3.png" alt="" />
                </div>
              </div>
            </div>
            <div className="article-item__end flex-shrink-0">
              <Link scroll={false} href="/blog-details" className="btn-simple">
                קרא עוד
                <span className="icon font-26">
                  <i className="las la-arrow-right" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogTwo;
