'use client'
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const MasterLayout = ({ children }) => {
    let pathname = usePathname();
    const router = useRouter();
    let [active, setActive] = useState(false)
    let [show, setShow] = useState(false)
    let [user, setUser] = useState(null)
    let [profile, setProfile] = useState(null)

    useEffect(() => {
        const supabase = createClient();
        
        // Get initial user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            if (user) {
                // Get profile
                supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()
                    .then(({ data }) => {
                        setProfile(data);
                    });
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    let dashboardControl = () => {
        setActive(!active)
    }
    let showProfileControl = () => {
        setShow(!show)
    }


    
    return (
        <>

            <div className="mobile-menu d-lg-none d-block" >
                <button type="button" className="close-button text-body hover-text-main" >
                    {" "}
                    <i className="las la-times" />{" "}
                </button>
                <div className="mobile-menu__inner">
                    <Link scroll={false} href="/" className="mobile-menu__logo">
                        <img
                            src="assets/images/logo/logo.png"
                            alt="Logo"
                            className="white-version"
                        />
                        <img
                            src="assets/images/logo/white-logo-two.png"
                            alt="Logo"
                            className="dark-version"
                        />
                    </Link>
                    <div className="mobile-menu__menu">
                        <ul className="nav-menu flx-align nav-menu--mobile">
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="#" className="nav-menu__link">
                                    דף הבית
                                </Link>
                                <ul className="nav-submenu">
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/" className="nav-submenu__link">
                                            {" "}
                                            דף הבית
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="/#" className="nav-menu__link">
                                    מוצרים
                                </Link>
                                <ul className="nav-submenu">
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/all-product" className="nav-submenu__link">
                                            {" "}
                                            כל המוצרים
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/product-details" className="nav-submenu__link">
                                            {" "}
                                            פרטי מוצר
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="/#" className="nav-menu__link">
                                    עמודים
                                </Link>
                                <ul className="nav-submenu">
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/profile" className="nav-submenu__link">
                                            {" "}
                                            פרופיל
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart" className="nav-submenu__link">
                                            {" "}
                                            עגלת קניות
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart-personal" className="nav-submenu__link">
                                            {" "}
                                            כתובת למשלוח
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart-payment" className="nav-submenu__link">
                                            {" "}
                                            אמצעי תשלום
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/cart-thank-you" className="nav-submenu__link">
                                            {" "}
                                            תצוגת הזמנה
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/dashboard" className="nav-submenu__link">
                                            {" "}
                                            לוח בקרה
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-menu__item has-submenu">
                                <Link scroll={false} href="/#" className="nav-menu__link">
                                    בלוג
                                </Link>
                                <ul className="nav-submenu">
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/blog" className="nav-submenu__link">
                                            {" "}
                                            בלוג
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/blog-details" className="nav-submenu__link">
                                            {" "}
                                            פרטי מאמר
                                        </Link>
                                    </li>
                                    <li className="nav-submenu__item">
                                        <Link scroll={false} href="/blog-details-sidebar" className="nav-submenu__link">
                                            {" "}
                                            מאמר עם סרגל צד
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-menu__item">
                                <Link scroll={false} href="/contact" className="nav-menu__link">
                                    צור קשר
                                </Link>
                            </li>
                        </ul>
                        <div className="header-right__inner d-lg-none my-3 gap-1 d-flex flx-align">
                            <Link scroll={false} href="/register" className="btn btn-main pill">
                                <span className="icon-left icon">
                                    <img src="assets/images/icons/user.svg" alt="" />
                                </span>
                                הרשמה
                            </Link>
                            <div className="language-select flx-align select-has-icon">
                                <img
                                    src="assets/images/icons/globe.svg"
                                    alt=""
                                    className="globe-icon white-version"
                                />
                                <img
                                    src="assets/images/icons/globe-white.svg"
                                    alt=""
                                    className="globe-icon dark-version"
                                />
                                <select className="select py-0 ps-2 border-0 fw-500">
                                    <option value={1}>עברית</option>
                                    <option value={2}>English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <section className={`dashboard ${active && "active"}`} onClick={()=> show ===true && setShow(false) }>
                <div className="dashboard__inner d-flex">
                    {/* Dashboard Sidebar Start */}
                    <div className={`dashboard-sidebar ${active && "active"}`}>
                        <button
                            type="button"
                            className="dashboard-sidebar__close d-lg-none d-flex text-body hover-text-main"  onClick={dashboardControl}
                        >
                            <i className="las la-times" />
                        </button>
                        <div className="dashboard-sidebar__inner">
                            <Link scroll={false} href="/" className="logo mb-48">
                                <img
                                    src="assets/images/logo/logo.png"
                                    alt=""
                                    className="white-version"
                                />
                                <img
                                    src="assets/images/logo/white-logo-two.png"
                                    alt=""
                                    className="dark-version"
                                />
                            </Link>
                            <Link scroll={false} href="/" className="logo favicon mb-48">
                                <img src="assets/images/logo/favicon.png" alt="" />
                            </Link>
                            {/* Sidebar List Start */}
                            <ul className="sidebar-list">
                                <li className={`sidebar-list__item ${pathname == "/dashboard" && "activePage"}`}>
                                    <Link scroll={false} href="/dashboard" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon1.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active1.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">לוח בקרה</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/dashboard-profile" && "activePage"}`}>
                                    <Link scroll={false} href="/dashboard-profile" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon2.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active2.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">פרופיל</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/follower" && "activePage"}`}>
                                    <Link scroll={false} href="/follower" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon4.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active4.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">עוקבים</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/following" && "activePage"}`}>
                                    <Link scroll={false} href="/following" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon5.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active5.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">נעקבים</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/setting" && "activePage"}`}>
                                    <Link scroll={false} href="/setting" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon10.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active10.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">הגדרות</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/statement" && "activePage"}`}>
                                    <Link scroll={false} href="/statement" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon12.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active12.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">דוחות</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/earning" && "activePage"}`}>
                                    <Link scroll={false} href="/earning" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon11.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active11.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">הכנסות</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/review" && "activePage"}`}>
                                    <Link scroll={false} href="/review" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon7.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active7.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">ביקורות</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/download" && "activePage"}`}>
                                    <Link scroll={false} href="/download" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon6.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active6.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">הורדות</span>
                                    </Link>
                                </li>
                                <li className={`sidebar-list__item ${pathname == "/refund" && "activePage"}`}>
                                    <Link scroll={false} href="/refund" className="sidebar-list__link">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon8.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active8.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">החזרים</span>
                                    </Link>
                                </li>
                                <li className="sidebar-list__item">
                                    <button onClick={handleLogout} className="sidebar-list__link w-100 border-0 bg-transparent text-start">
                                        <span className="sidebar-list__icon">
                                            <img
                                                src="assets/images/icons/sidebar-icon13.svg"
                                                alt=""
                                                className="icon"
                                            />
                                            <img
                                                src="assets/images/icons/sidebar-icon-active13.svg"
                                                alt=""
                                                className="icon icon-active"
                                            />
                                        </span>
                                        <span className="text">התנתקות</span>
                                    </button>
                                </li>
                            </ul>
                            {/* Sidebar List End */}
                        </div>
                    </div>

                    <div className="dashboard-body">
                        {/* Dashboard Nav Start */}
                        <div className="dashboard-nav bg-white flx-between gap-md-3 gap-2">
                            <div className="dashboard-nav__left flx-align gap-md-3 gap-2">
                                <button onClick={dashboardControl}
                                    type="button"
                                    className="icon-btn bar-icon text-heading bg-gray-seven flx-center"
                                >
                                    <i className="las la-bars" />
                                </button>
                                <button onClick={dashboardControl}
                                    type="button"
                                    className="icon-btn arrow-icon text-heading bg-gray-seven flx-center"
                                >
                                    <img src="assets/images/icons/angle-right.svg" alt="" />
                                </button>
                                <form action="#" className="search-input d-sm-block d-none">
                                    <span className="icon">
                                        <img
                                            src="assets/images/icons/search-dark.svg"
                                            alt=""
                                            className="white-version"
                                        />
                                        <img
                                            src="assets/images/icons/search-dark-white.svg"
                                            alt=""
                                            className="dark-version"
                                        />
                                    </span>
                                    <input
                                        type="text"
                                        className="common-input common-input--md common-input--bg pill w-100"
                                        placeholder="חיפוש..."
                                    />
                                </form>
                            </div>
                            <div className="dashboard-nav__right" >
                                <div className="header-right flx-align">
                                    <div className="header-right__inner gap-sm-3 gap-2 flx-align d-flex">
                                        {/* Light Dark Mode */}
                                       <ThemeToggle/>
                                        <div className="user-profile">
                                            <button className="user-profile__button flex-align" onClick={showProfileControl}>
                                                <span className="user-profile__thumb">
                                                    <img
                                                        src="assets/images/thumbs/user-profile.png"
                                                        className="cover-img"
                                                        alt=""
                                                    />
                                                </span>
                                            </button>
                                            <ul className={`user-profile-dropdown ${show && "show"} `}>
                                                <li className="sidebar-list__item">
                                                    <Link scroll={false} href="/dashboard-profile" className="sidebar-list__link">
                                                        <span className="sidebar-list__icon">
                                                            <img
                                                                src="assets/images/icons/sidebar-icon2.svg"
                                                                alt=""
                                                                className="icon"
                                                            />
                                                            <img
                                                                src="assets/images/icons/sidebar-icon-active2.svg"
                                                                alt=""
                                                                className="icon icon-active"
                                                            />
                                                        </span>
                                                        <span className="text">פרופיל</span>
                                                    </Link>
                                                </li>
                                                <li className="sidebar-list__item">
                                                    <Link scroll={false} href="/setting" className="sidebar-list__link">
                                                        <span className="sidebar-list__icon">
                                                            <img
                                                                src="assets/images/icons/sidebar-icon10.svg"
                                                                alt=""
                                                                className="icon"
                                                            />
                                                            <img
                                                                src="assets/images/icons/sidebar-icon-active10.svg"
                                                                alt=""
                                                                className="icon icon-active"
                                                            />
                                                        </span>
                                                        <span className="text">הגדרות</span>
                                                    </Link>
                                                </li>
                                                <li className="sidebar-list__item">
                                                    <button onClick={handleLogout} className="sidebar-list__link w-100 border-0 bg-transparent">
                                                        <span className="sidebar-list__icon">
                                                            <img
                                                                src="assets/images/icons/sidebar-icon13.svg"
                                                                alt=""
                                                                className="icon"
                                                            />
                                                            <img
                                                                src="assets/images/icons/sidebar-icon-active13.svg"
                                                                alt=""
                                                                className="icon icon-active"
                                                            />
                                                        </span>
                                                        <span className="text">התנתקות</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="language-select flx-align select-has-icon">
                                            <img
                                                src="assets/images/icons/globe.svg"
                                                alt=""
                                                className="globe-icon white-version"
                                            />
                                            <img
                                                src="assets/images/icons/globe-white.svg"
                                                alt=""
                                                className="globe-icon dark-version"
                                            />
                                            <select className="select py-0 ps-2 border-0 fw-500">
                                                <option value={1}>עברית</option>
                                                <option value={2}>English</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* children */}
                        {children}
                        {/* Dashboard Footer */}
                        <div className="dashboard-footer bottom-footer-two mt-32 border-0 bg-white">
                            <div className="bottom-footer__inner flx-between gap-3">
                                <p className="bottom-footer__text font-14">
                                    {" "}
                                    כל הזכויות שמורות © 2024 DPmarket
                                </p>
                                <div className="footer-links gap-4">
                                    <Link scroll={false} href="/#" className="footer-link hover-text-heading font-14">
                                        תנאי שימוש
                                    </Link>
                                    <Link scroll={false} href="/#" className="footer-link hover-text-heading font-14">
                                        מדיניות פרטיות
                                    </Link>
                                    <Link scroll={false} href="/#" className="footer-link hover-text-heading font-14">
                                        עוגיות
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>




        </>
    );
}

export default MasterLayout;
