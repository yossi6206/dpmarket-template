'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'your-password' ? 'password' : id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim()) {
      setError('נא להזין אימייל');
      return;
    }
    if (!formData.password) {
      setError('נא להזין סיסמה');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (signInError) {
        if (signInError.message.includes('Invalid login credentials')) {
          setError('אימייל או סיסמה שגויים');
        } else if (signInError.message.includes('Email not confirmed')) {
          setError('יש לאשר את האימייל לפני ההתחברות');
        } else {
          setError(signInError.message);
        }
        return;
      }

      // Success - redirect to dashboard
      router.push('/dashboard');
      router.refresh();

    } catch (err) {
      setError('אירעה שגיאה, נסה שוב מאוחר יותר');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const supabase = createClient();
    
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError('שגיאה בהתחברות עם גוגל');
    }
  };

  return (
    <>
      <section className="account d-flex">
        <img
          src="assets/images/thumbs/account-img.png"
          alt=""
          className="account__img"
        />
        <div className="account__left d-md-flex d-none flx-align section-bg position-relative z-index-1 overflow-hidden">
          <img
            src="assets/images/shapes/pattern-curve-seven.png"
            alt=""
            className="position-absolute end-0 top-0 z-index--1 h-100"
          />
          <div className="account-thumb">
            <img src="assets/images/thumbs/banner-img.png" alt="" />
            <div className="statistics animation bg-main text-center">
              <h5 className="statistics__amount text-white">50k</h5>
              <span className="statistics__text text-white font-14">
                לקוחות
              </span>
            </div>
          </div>
        </div>
        <div className="account__right padding-y-120 flx-align">
          <div className="dark-light-mode">
            <ThemeToggle />
          </div>
          <div className="account-content">
            <Link scroll={false} href="/" className="logo mb-64">
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
            <h4 className="account-content__title mb-48 text-capitalize">
              ברוכים השבים!
            </h4>

            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row gy-4">
                <div className="col-12">
                  <label
                    htmlFor="email"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
                    אימייל
                  </label>
                  <div className="position-relative">
                    <input
                      type="email"
                      className="common-input common-input--bg common-input--withIcon"
                      id="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="input-icon">
                      <img src="assets/images/icons/envelope-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <label
                    htmlFor="your-password"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
                    סיסמה
                  </label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="common-input common-input--bg common-input--withIcon"
                      id="your-password"
                      placeholder="6+ תווים, אות גדולה אחת"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span
                      className="input-icon toggle-password cursor-pointer"
                    >
                      <img src="assets/images/icons/lock-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="flx-between gap-1">
                    <div className="common-check my-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="checkbox"
                        id="keepMe"
                        checked={formData.keepMe}
                        onChange={handleChange}
                        disabled={loading}
                      />
                      <label
                        className="form-check-label mb-0 fw-400 font-14 text-body"
                        htmlFor="keepMe"
                      >
                        זכור אותי
                      </label>
                    </div>
                    <Link scroll={false}
                      href="#"
                      className="forgot-password text-decoration-underline text-main text-poppins font-14"
                    >
                      שכחת סיסמה?
                    </Link>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-main btn-lg w-100 pill"
                    disabled={loading}
                  >
                    {loading ? 'מתחבר...' : 'התחברות'}
                  </button>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline-light btn-lg-icon btn-lg w-100 pill"
                    disabled={loading}
                  >
                    <span className="icon icon-left">
                      <img src="assets/images/icons/google.svg" alt="" />
                    </span>
                    התחברות עם גוגל
                  </button>
                </div>
                <div className="col-sm-12 mb-0">
                  <div className="have-account">
                    <p className="text font-14">
                      חדש באתר?{" "}
                      <Link scroll={false}
                        className="link text-main text-decoration-underline fw-500"
                        href="/register"
                      >
                        הרשמה
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
