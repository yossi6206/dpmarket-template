'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    agree: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id === 'name' ? 'fullName' : id === 'your-password' ? 'password' : id]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.fullName.trim()) {
      setError('נא להזין שם מלא');
      return;
    }
    if (!formData.email.trim()) {
      setError('נא להזין אימייל');
      return;
    }
    if (formData.password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }
    if (!formData.agree) {
      setError('יש לאשר את תנאי השימוש');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      });

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('האימייל הזה כבר רשום במערכת');
        } else {
          setError(signUpError.message);
        }
        return;
      }

      // Check if email confirmation is required
      if (data?.user?.identities?.length === 0) {
        setError('האימייל הזה כבר רשום במערכת');
        return;
      }

      setSuccess('נרשמת בהצלחה! מעביר אותך לדשבורד...');
      
      // Redirect after short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);

    } catch (err) {
      setError('אירעה שגיאה, נסה שוב מאוחר יותר');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
        <div className="account__right padding-t-120 flx-align">
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
              יצירת חשבון חינם
            </h4>

            {error && (
              <div className="alert alert-danger mb-4" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success mb-4" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row gy-4">
                <div className="col-12">
                  <label
                    htmlFor="name"
                    className="form-label mb-2 font-18 font-heading fw-600"
                  >
                    שם מלא
                  </label>
                  <div className="position-relative">
                    <input
                      type="text"
                      className="common-input common-input--bg common-input--withIcon"
                      id="name"
                      placeholder="השם המלא שלך"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <span className="input-icon">
                      <img src="assets/images/icons/user-icon.svg" alt="" />
                    </span>
                  </div>
                </div>
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
                  <div className="common-check my-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="checkbox"
                      id="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      disabled={loading}
                    />
                    <label
                      className="form-check-label mb-0 fw-400 font-16 text-body"
                      htmlFor="agree"
                    >
                      אני מסכים לתנאי השימוש
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-main btn-lg w-100 pill"
                    disabled={loading}
                  >
                    {loading ? 'נרשם...' : 'יצירת חשבון'}
                  </button>
                </div>
                <div className="col-12">
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    className="btn btn-outline-light btn-lg-icon btn-lg w-100 pill"
                    disabled={loading}
                  >
                    <span className="icon icon-left">
                      <img src="assets/images/icons/google.svg" alt="" />
                    </span>
                    הרשמה עם גוגל
                  </button>
                </div>
                <div className="col-sm-12 mb-0">
                  <div className="have-account">
                    <p className="text font-14">
                      כבר יש לך חשבון?{" "}
                      <Link scroll={false}
                        className="link text-main text-decoration-underline fw-500"
                        href="/login"
                      >
                        התחברות
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

export default Register;
