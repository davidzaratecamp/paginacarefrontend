import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, FileText, Settings } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../../config/api';

const Admin = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    pendingReviews: 0,
    totalPosts: 0,
    approvedReviews: 0
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin/login';
      return;
    }
    
    setIsAuthenticated(true);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch multiple endpoints for dashboard stats
      const [contactsRes, reviewsRes] = await Promise.all([
        axios.get(`${API_URL}/api/admin/contacts?limit=1`, { headers }),
        axios.get(`${API_URL}/api/admin/reviews?status=pending&limit=1`, { headers })
      ]);

      setStats({
        totalContacts: contactsRes.data.pagination?.total || 0,
        pendingReviews: reviewsRes.data.pagination?.total || 0,
        totalPosts: 0, // Will be implemented later
        approvedReviews: 0 // Will be implemented later
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
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
              <img
                src="/images/logobama.png"
                alt="Asiste Health Care"
                className="h-10 w-10 mr-3"
              />
              <h1 className="text-xl font-semibold text-gray-900">
                Panel de Administración
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Ver sitio web
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
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Contactos
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalContacts}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Reseñas Pendientes
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.pendingReviews}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Posts del Blog
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.totalPosts}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <MessageSquare className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Reseñas Aprobadas
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {stats.approvedReviews}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Acciones Rápidas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  to="/admin/forms"
                  className="border border-gray-300 rounded-lg p-4 hover:border-primary-500 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary-600 mr-3" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Ver Contactos
                      </h4>
                      <p className="text-sm text-gray-500">
                        Gestionar formularios recibidos
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/admin/reviews"
                  className="border border-gray-300 rounded-lg p-4 hover:border-primary-500 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center">
                    <MessageSquare className="h-8 w-8 text-yellow-600 mr-3" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Moderar Reseñas
                      </h4>
                      <p className="text-sm text-gray-500">
                        Aprobar o rechazar reseñas
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/admin/blog"
                  className="border border-gray-300 rounded-lg p-4 hover:border-primary-500 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center">
                    <FileText className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">
                        Gestionar Blog
                      </h4>
                      <p className="text-sm text-gray-500">
                        Crear y editar posts
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;