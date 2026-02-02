'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const AddProduct = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        short_description: '',
        price: '',
        sale_price: '',
        category_id: '',
        thumbnail_url: '',
        demo_url: '',
        file_url: '',
        tags: '',
        features: '',
        requirements: '',
        version: '1.0'
    });

    useEffect(() => {
        const supabase = createClient();
        
        // Get user
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
            if (!user) {
                router.push('/login');
            }
        });

        // Get categories
        supabase
            .from('categories')
            .select('*')
            .eq('is_active', true)
            .order('sort_order')
            .then(({ data }) => {
                setCategories(data || []);
            });
    }, [router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim() + '-' + Date.now();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!formData.title.trim()) {
            setError('נא להזין שם מוצר');
            return;
        }
        if (!formData.price || parseFloat(formData.price) <= 0) {
            setError('נא להזין מחיר תקין');
            return;
        }
        if (!formData.category_id) {
            setError('נא לבחור קטגוריה');
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();

            const productData = {
                seller_id: user.id,
                title: formData.title,
                slug: generateSlug(formData.title),
                description: formData.description,
                short_description: formData.short_description,
                price: parseFloat(formData.price),
                sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
                category_id: formData.category_id,
                thumbnail_url: formData.thumbnail_url || '/assets/images/thumbs/product-img1.png',
                demo_url: formData.demo_url,
                file_url: formData.file_url,
                tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
                features: formData.features ? formData.features.split('\n').map(f => f.trim()).filter(f => f) : [],
                requirements: formData.requirements,
                version: formData.version,
                is_active: true,
                is_featured: false
            };

            const { data, error: insertError } = await supabase
                .from('products')
                .insert(productData)
                .select()
                .single();

            if (insertError) {
                throw insertError;
            }

            setSuccess('המוצר נוסף בהצלחה!');
            
            // Reset form
            setFormData({
                title: '',
                description: '',
                short_description: '',
                price: '',
                sale_price: '',
                category_id: '',
                thumbnail_url: '',
                demo_url: '',
                file_url: '',
                tags: '',
                features: '',
                requirements: '',
                version: '1.0'
            });

            // Redirect to products page after delay
            setTimeout(() => {
                router.push('/all-product');
            }, 2000);

        } catch (err) {
            console.error('Error adding product:', err);
            setError('שגיאה בהוספת המוצר: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-body__content">
            <div className="welcome-balance mt-2 mb-40">
                <h4 className="welcome-balance__title mb-0">הוספת מוצר חדש</h4>
            </div>

            <div className="dashboard-card">
                <div className="dashboard-card__header">
                    <h6 className="dashboard-card__title mb-0">פרטי המוצר</h6>
                </div>

                {error && (
                    <div className="alert alert-danger m-3" role="alert">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="alert alert-success m-3" role="alert">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-4">
                    <div className="row gy-4">
                        {/* Title */}
                        <div className="col-12">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                שם המוצר *
                            </label>
                            <input
                                type="text"
                                name="title"
                                className="common-input common-input--bg"
                                placeholder="לדוגמה: תבנית וורדפרס לחנות אונליין"
                                value={formData.title}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Short Description */}
                        <div className="col-12">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                תיאור קצר
                            </label>
                            <input
                                type="text"
                                name="short_description"
                                className="common-input common-input--bg"
                                placeholder="תיאור קצר של המוצר (עד 150 תווים)"
                                value={formData.short_description}
                                onChange={handleChange}
                                disabled={loading}
                                maxLength={150}
                            />
                        </div>

                        {/* Description */}
                        <div className="col-12">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                תיאור מלא
                            </label>
                            <textarea
                                name="description"
                                className="common-input common-input--bg"
                                placeholder="תיאור מפורט של המוצר..."
                                rows={5}
                                value={formData.description}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Category */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                קטגוריה *
                            </label>
                            <select
                                name="category_id"
                                className="common-input common-input--bg"
                                value={formData.category_id}
                                onChange={handleChange}
                                disabled={loading}
                            >
                                <option value="">בחר קטגוריה</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Price */}
                        <div className="col-md-3">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                מחיר (₪) *
                            </label>
                            <input
                                type="number"
                                name="price"
                                className="common-input common-input--bg"
                                placeholder="99"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Sale Price */}
                        <div className="col-md-3">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                מחיר מבצע (₪)
                            </label>
                            <input
                                type="number"
                                name="sale_price"
                                className="common-input common-input--bg"
                                placeholder="79"
                                min="0"
                                step="0.01"
                                value={formData.sale_price}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Thumbnail URL */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                קישור לתמונת המוצר
                            </label>
                            <input
                                type="url"
                                name="thumbnail_url"
                                className="common-input common-input--bg"
                                placeholder="https://example.com/image.jpg"
                                value={formData.thumbnail_url}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Demo URL */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                קישור להדגמה (Demo)
                            </label>
                            <input
                                type="url"
                                name="demo_url"
                                className="common-input common-input--bg"
                                placeholder="https://demo.example.com"
                                value={formData.demo_url}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* File URL */}
                        <div className="col-12">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                קישור להורדת הקובץ
                            </label>
                            <input
                                type="url"
                                name="file_url"
                                className="common-input common-input--bg"
                                placeholder="https://drive.google.com/... או קישור אחר"
                                value={formData.file_url}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Tags */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                תגיות (מופרדות בפסיק)
                            </label>
                            <input
                                type="text"
                                name="tags"
                                className="common-input common-input--bg"
                                placeholder="וורדפרס, תבנית, חנות, ecommerce"
                                value={formData.tags}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Version */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                גרסה
                            </label>
                            <input
                                type="text"
                                name="version"
                                className="common-input common-input--bg"
                                placeholder="1.0"
                                value={formData.version}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Features */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                תכונות (שורה לכל תכונה)
                            </label>
                            <textarea
                                name="features"
                                className="common-input common-input--bg"
                                placeholder="רספונסיבי&#10;תמיכה ב-RTL&#10;עדכונים חינם"
                                rows={4}
                                value={formData.features}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Requirements */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                דרישות מערכת
                            </label>
                            <textarea
                                name="requirements"
                                className="common-input common-input--bg"
                                placeholder="WordPress 5.0+&#10;PHP 7.4+&#10;WooCommerce 5.0+"
                                rows={4}
                                value={formData.requirements}
                                onChange={handleChange}
                                disabled={loading}
                            />
                        </div>

                        {/* Submit */}
                        <div className="col-12 mt-4">
                            <button
                                type="submit"
                                className="btn btn-main btn-lg pill"
                                disabled={loading}
                            >
                                {loading ? 'מוסיף מוצר...' : 'הוסף מוצר'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
