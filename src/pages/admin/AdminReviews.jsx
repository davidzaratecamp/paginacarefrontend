import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle, Trash2, Star } from 'lucide-react';
import axios from 'axios';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filter, setFilter] = useState('pending');
  const [selectedReviews, setSelectedReviews] = useState([]);

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    
    setIsAuthenticated(true);
    fetchReviews();
  }, [filter]);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`http://localhost:5001/api/admin/reviews?status=${filter}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReviews(response.data.reviews || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (reviewId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.put(`http://localhost:5001/api/reviews/${reviewId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      fetchReviews(); // Refresh the list
    } catch (error) {
      console.error('Error approving review:', error);
      alert('Error al aprobar la reseña');
    }
  };

  const handleDelete = async (reviewId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta reseña?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5001/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setReviews(reviews.filter(review => review.id !== reviewId));
      setSelectedReviews(selectedReviews.filter(id => id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error al eliminar la reseña');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedReviews.length === 0) return;
    
    if (!confirm(`¿Estás seguro de que quieres eliminar ${selectedReviews.length} reseñas?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      const deletePromises = selectedReviews.map(id => 
        axios.delete(`http://localhost:5001/api/reviews/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      
      await Promise.all(deletePromises);
      setReviews(reviews.filter(review => !selectedReviews.includes(review.id)));
      setSelectedReviews([]);
    } catch (error) {
      console.error('Error deleting reviews:', error);
      alert('Error al eliminar las reseñas');
    }
  };

  const toggleSelectReview = (reviewId) => {
    if (selectedReviews.includes(reviewId)) {
      setSelectedReviews(selectedReviews.filter(id => id !== reviewId));
    } else {
      setSelectedReviews([...selectedReviews, reviewId]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedReviews.length === reviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(reviews.map(review => review.id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
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
                  Moderación de Reseñas
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/admin"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
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
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Page header with filters */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Reseñas de Clientes</h2>
              <p className="text-gray-600">
                {reviews.length} reseñas encontradas
                {selectedReviews.length > 0 && ` (${selectedReviews.length} seleccionadas)`}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Filter buttons */}
              <div className="flex rounded-md shadow-sm">
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 text-sm font-medium border rounded-l-md ${
                    filter === 'pending'
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Pendientes
                </button>
                <button
                  onClick={() => setFilter('approved')}
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    filter === 'approved'
                      ? 'bg-green-50 text-green-700 border-green-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Aprobadas
                </button>
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 text-sm font-medium border rounded-r-md ${
                    filter === 'all'
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Todas
                </button>
              </div>

              {selectedReviews.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar Seleccionadas
                </button>
              )}
            </div>
          </div>

          {/* Reviews table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Cargando reseñas...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No hay reseñas {filter === 'pending' ? 'pendientes' : filter === 'approved' ? 'aprobadas' : 'disponibles'}.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Select all checkbox */}
                  <div className="flex items-center border-b pb-4">
                    <input
                      type="checkbox"
                      checked={selectedReviews.length === reviews.length}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mr-4"
                    />
                    <span className="text-sm text-gray-500">Seleccionar todas</span>
                  </div>

                  {/* Reviews list */}
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <input
                            type="checkbox"
                            checked={selectedReviews.includes(review.id)}
                            onChange={() => toggleSelectReview(review.id)}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded mt-1"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-4 mb-3">
                              <h3 className="text-lg font-medium text-gray-900">{review.name}</h3>
                              <span className="text-sm text-gray-500">{review.email}</span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                review.approved 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {review.approved ? 'Aprobada' : 'Pendiente'}
                              </span>
                            </div>
                            
                            <p className="text-gray-700 mb-3 italic">"{review.comment}"</p>
                            
                            <p className="text-sm text-gray-500">
                              Recibida el {new Date(review.createdAt).toLocaleString('es-ES')}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {!review.approved && (
                            <button
                              onClick={() => handleApprove(review.id)}
                              className="text-green-600 hover:text-green-800 p-2 rounded-full hover:bg-green-50 transition-colors"
                              title="Aprobar reseña"
                            >
                              <CheckCircle className="h-5 w-5" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(review.id)}
                            className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors"
                            title="Eliminar reseña"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminReviews;