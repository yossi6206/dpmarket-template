'use client'

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const AddProduct = () => {
    const router = useRouter();
    const imageInputRef = useRef(null);
    const fileInputRef = useRef(null);
    
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(null);
    
    const [imagePreview, setImagePreview] = useState(null);
    const [fileName, setFileName] = useState('');
    
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

    // Handle image upload
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            setError('סוג קובץ לא נתמך. אנא העלה תמונה (JPG, PNG, GIF, WEBP)');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('התמונה גדולה מדי. גודל מקסימלי: 5MB');
            return;
        }

        setUploadingImage(true);
        setError('');

        try {
            const supabase = createClient();
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Date.now()}.${fileExt}`;

            const { data, error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('product-images')
                .getPublicUrl(fileName);

            setFormData(prev => ({ ...prev, thumbnail_url: publicUrl }));
            setImagePreview(publicUrl);

        } catch (err) {
            console.error('Error uploading image:', err);
            setError('שגיאה בהעלאת התמונה: ' + err.message);
        } finally {
            setUploadingImage(false);
        }
    };

    // Handle product file upload (ZIP)
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['application/zip', 'application/x-zip-compressed', 'application/x-rar-compressed', 'application/octet-stream'];
        const validExtensions = ['.zip', '.rar', '.7z'];
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();
        
        if (!validTypes.includes(file.type) && !validExtensions.includes(fileExt)) {
            setError('סוג קובץ לא נתמך. אנא העלה קובץ ZIP, RAR או 7Z');
            return;
        }

        // Validate file size (max 100MB)
        if (file.size > 100 * 1024 * 1024) {
            setError('הקובץ גדול מדי. גודל מקסימלי: 100MB');
            return;
        }

        setUploadingFile(true);
        setError('');

        try {
            const supabase = createClient();
            const fileName = `${user.id}-${Date.now()}-${file.name}`;

            const { data, error: uploadError } = await supabase.storage
                .from('product-files')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Store the file path (not public URL since it's private)
            setFormData(prev => ({ ...prev, file_url: fileName }));
            setFileName(file.name);

        } catch (err) {
            console.error('Error uploading file:', err);
            setError('שגיאה בהעלאת הקובץ: ' + err.message);
        } finally {
            setUploadingFile(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
            setImagePreview(null);
            setFileName('');

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

                        {/* Image Upload */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                תמונת המוצר
                            </label>
                            <div 
                                className="upload-area"
                                onClick={() => imageInputRef.current?.click()}
                                style={{
                                    border: '2px dashed #ddd',
                                    borderRadius: '12px',
                                    padding: '30px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#f8f9fa',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {uploadingImage ? (
                                    <div>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">מעלה...</span>
                                        </div>
                                        <p className="mb-0">מעלה תמונה...</p>
                                    </div>
                                ) : imagePreview ? (
                                    <div>
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            style={{ 
                                                maxWidth: '100%', 
                                                maxHeight: '150px',
                                                borderRadius: '8px'
                                            }} 
                                        />
                                        <p className="mt-2 mb-0 text-success">
                                            <i className="fas fa-check-circle"></i> התמונה הועלתה
                                        </p>
                                    </div>
                                ) : (
                                    <div>
                                        <i className="fas fa-cloud-upload-alt fa-3x text-muted mb-3"></i>
                                        <p className="mb-1">לחץ להעלאת תמונה</p>
                                        <small className="text-muted">JPG, PNG, GIF, WEBP (עד 5MB)</small>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                                disabled={loading || uploadingImage}
                            />
                        </div>

                        {/* File Upload */}
                        <div className="col-md-6">
                            <label className="form-label mb-2 font-18 font-heading fw-600">
                                קובץ המוצר להורדה (ZIP)
                            </label>
                            <div 
                                className="upload-area"
                                onClick={() => fileInputRef.current?.click()}
                                style={{
                                    border: '2px dashed #ddd',
                                    borderRadius: '12px',
                                    padding: '30px',
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    backgroundColor: '#f8f9fa',
                                    transition: 'all 0.3s'
                                }}
                            >
                                {uploadingFile ? (
                                    <div>
                                        <div className="spinner-border text-primary mb-2" role="status">
                                            <span className="visually-hidden">מעלה...</span>
                                        </div>
                                        <p className="mb-0">מעלה קובץ...</p>
                                    </div>
                                ) : fileName ? (
                                    <div>
                                        <i className="fas fa-file-archive fa-3x text-success mb-2"></i>
                                        <p className="mb-1 text-success">
                                            <i className="fas fa-check-circle"></i> הקובץ הועלה
                                        </p>
                                        <small className="text-muted">{fileName}</small>
                                    </div>
                                ) : (
                                    <div>
                                        <i className="fas fa-file-archive fa-3x text-muted mb-3"></i>
                                        <p className="mb-1">לחץ להעלאת קובץ</p>
                                        <small className="text-muted">ZIP, RAR, 7Z (עד 100MB)</small>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".zip,.rar,.7z"
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                disabled={loading || uploadingFile}
                            />
                        </div>

                        {/* Demo URL */}
                        <div className="col-12">
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
                                disabled={loading || uploadingImage || uploadingFile}
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
