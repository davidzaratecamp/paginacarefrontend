import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import slugify from 'slugify';
import axios from 'axios';
import { API_URL } from '../../config/api';

const blogSchema = z.object({
    title: z.string().min(1, 'El título es requerido').max(500, 'Título muy largo'),
    slug: z.string().min(1, 'El slug es requerido').max(500, 'Slug muy largo'),
    excerpt: z.string().min(10, 'El extracto debe tener al menos 10 caracteres').max(500, 'Extracto muy largo'),
    category: z.string().min(1, 'La categoría es requerida'),
    tags: z.string().optional(),
    image: z.string().optional(),
    metaTitle: z.string().max(500, 'Meta título muy largo').optional(),
    metaDescription: z.string().max(500, 'Meta descripción muy larga').optional(),
    published: z.boolean().optional(),
    featured: z.boolean().optional(),
});

const AdminEditBlog = () => {
    const { id } = useParams();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const categories = [
        'Obamacare',
        'Seguros de Salud',
        'Subsidios',
        'Medicare',
        'Medicaid',
        'Guías',
        'Noticias',
        'Consejos'
    ];

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(blogSchema),
        defaultValues: {
            published: false,
            featured: false,
        }
    });

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('adminToken');
        if (!token) {
            window.location.href = '/admin/login';
            return;
        }
        setIsAuthenticated(true);

        // Load post data
        loadPost();
    }, [id]);

    const loadPost = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await axios.get(`${API_URL}/api/blog/admin/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const post = response.data.post;

            // Set form values
            reset({
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                category: post.category,
                tags: post.tags || '',
                image: post.image || '',
                metaTitle: post.metaTitle || '',
                metaDescription: post.metaDescription || '',
                published: Boolean(post.published),
                featured: Boolean(post.featured),
            });

            // Set content for editor
            setContent(post.content);

        } catch (error) {
            console.error('Error loading post:', error);
            setSubmitMessage('Error al cargar el post');
        } finally {
            setIsLoading(false);
        }
    };

    // Auto-generate slug from title
    const handleTitleChange = (e) => {
        const title = e.target.value;
        const slug = slugify(title, {
            lower: true,
            strict: true,
            locale: 'es'
        });
        setValue('slug', slug);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin/login';
    };

    const onSubmit = async (data, saveAsDraft = false) => {
        if (!content.trim()) {
            setSubmitMessage('El contenido del post es requerido');
            return;
        }

        setIsSubmitting(true);
        setSubmitMessage('');

        try {
            const token = localStorage.getItem('adminToken');
            const postData = {
                ...data,
                content,
                published: saveAsDraft ? false : data.published,
                metaTitle: data.metaTitle || data.title,
                metaDescription: data.metaDescription || data.excerpt,
            };

            const response = await axios.put(`${API_URL}/api/blog/${id}`, postData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200) {
                setSubmitMessage(
                    saveAsDraft
                        ? '¡Post guardado como borrador!'
                        : '¡Post actualizado exitosamente!'
                );

                // Redirect to blog list after 2 seconds
                setTimeout(() => {
                    navigate('/admin/blog');
                }, 2000);
            }
        } catch (error) {
            console.error('Error updating blog post:', error);
            if (error.response?.data?.error) {
                setSubmitMessage(`Error: ${error.response.data.error}`);
            } else {
                setSubmitMessage('Error al actualizar el post. Inténtalo de nuevo.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSaveDraft = () => {
        handleSubmit((data) => onSubmit(data, true))();
    };

    if (!isAuthenticated || isLoading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Cargando post...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/admin" className="flex items-center">
                                <img
                                    src="/images/logobama.png"
                                    alt="Asiste Health Care"
                                    className="h-10 w-10 mr-3"
                                />
                                <h1 className="text-xl font-semibold text-gray-900">
                                    Editar Post del Blog
                                </h1>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/admin/blog"
                                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium inline-flex items-center"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Volver a Blog
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-6xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <form onSubmit={handleSubmit((data) => onSubmit(data, false))} className="space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Información Básica</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Título *
                                    </label>
                                    <input
                                        {...register('title')}
                                        type="text"
                                        onChange={handleTitleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Título del post"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Slug (URL) *
                                    </label>
                                    <input
                                        {...register('slug')}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="slug-del-post"
                                    />
                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoría *
                                    </label>
                                    <select
                                        {...register('category')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tags (separados por comas)
                                    </label>
                                    <input
                                        {...register('tags')}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="obamacare, seguros, salud"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL de imagen (opcional)
                                    </label>
                                    <input
                                        {...register('image')}
                                        type="url"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="https://ejemplo.com/imagen.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Extracto</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Extracto del post *
                                </label>
                                <textarea
                                    {...register('excerpt')}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                    placeholder="Breve descripción que aparecerá en la lista de posts..."
                                />
                                {errors.excerpt && (
                                    <p className="mt-1 text-sm text-red-600">{errors.excerpt.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Content Editor */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Contenido del Post</h3>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contenido *
                                </label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    rows={15}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono text-sm"
                                    placeholder="Escribe el contenido del post aquí..."
                                />
                                {!content.trim() && submitMessage.includes('contenido') && (
                                    <p className="mt-1 text-sm text-red-600">El contenido del post es requerido</p>
                                )}
                            </div>
                        </div>

                        {/* SEO Settings */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Configuración SEO</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Título (opcional)
                                    </label>
                                    <input
                                        {...register('metaTitle')}
                                        type="text"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Si está vacío, se usará el título del post"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Recomendado: 50-60 caracteres
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Meta Descripción (opcional)
                                    </label>
                                    <textarea
                                        {...register('metaDescription')}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                        placeholder="Si está vacía, se usará el extracto del post"
                                    />
                                    <p className="mt-1 text-xs text-gray-500">
                                        Recomendado: 150-160 caracteres
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Publishing Options */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-6">Opciones de Publicación</h3>

                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        {...register('published')}
                                        type="checkbox"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                        Publicar inmediatamente
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        {...register('featured')}
                                        type="checkbox"
                                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                    />
                                    <label className="ml-2 block text-sm text-gray-900">
                                        Marcar como destacado
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button
                                        type="button"
                                        onClick={handleSaveDraft}
                                        disabled={isSubmitting}
                                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4 mr-2" />
                                        {isSubmitting ? 'Guardando...' : 'Guardar Borrador'}
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                                                Actualizando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="h-4 w-4 mr-2" />
                                                Actualizar Post
                                            </>
                                        )}
                                    </button>
                                </div>

                                {submitMessage && (
                                    <div className={`text-sm font-medium ${submitMessage.includes('exitosamente') || submitMessage.includes('borrador')
                                        ? 'text-green-600'
                                        : 'text-red-600'
                                        }`}>
                                        {submitMessage}
                                    </div>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AdminEditBlog;