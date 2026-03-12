import { useState, useEffect } from 'react';
import api from '../utils/api';
import API_BASE_URL from '../config';

function BabyCareTips() {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTip, setEditingTip] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Feeding',
    isVisible: true,
    image: null
  });

  const categories = ['Feeding', 'Sleep', 'Health', 'Development', 'Safety', 'Skincare'];

  useEffect(() => {
    fetchTips();
  }, []);

  const fetchTips = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tips/admin/all');
      setTips(res.data);
    } catch (err) {
      console.error("Error fetching tips", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('category', formData.category);
    data.append('isVisible', formData.isVisible);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingTip) {
        await api.put(`/tips/${editingTip._id}`, data);
      } else {
        await api.post('/tips', data);
      }
      setShowModal(false);
      resetForm();
      fetchTips();
    } catch (err) {
      console.error("Error saving tip", err);
      alert("Failed to save tip.");
    }
  };

  const handleEdit = (tip) => {
    setEditingTip(tip);
    setFormData({
      title: tip.title,
      content: tip.content,
      category: tip.category,
      isVisible: tip.isVisible,
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tip?")) {
      try {
        await api.delete(`/tips/${id}`);
        fetchTips();
      } catch (err) {
        console.error("Error deleting tip", err);
        alert("Failed to delete tip.");
      }
    }
  };

  const resetForm = () => {
    setEditingTip(null);
    setFormData({
      title: '',
      content: '',
      category: 'Feeding',
      isVisible: true,
      image: null
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Baby Care Tips</h1>
          <p className="text-sm text-slate-500 mt-1">Manage expert advice articles for your customers.</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm flex items-center gap-2"
        >
          <span>+</span> Add New Tip
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500">Loading tips...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4 font-semibold">Tip</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tips.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No baby care tips found.</td>
                  </tr>
                ) : (
                  tips.map((tip) => (
                    <tr key={tip._id} className={`transition-colors hover:bg-slate-50/50 ${!tip.isVisible ? 'bg-slate-50 opacity-70' : ''}`}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img 
                            src={tip.image ? `${API_BASE_URL}${tip.image}` : 'https://via.placeholder.com/100'} 
                            alt="" 
                            className="w-10 h-10 rounded-md object-cover border border-slate-100"
                          />
                          <span className="font-semibold text-slate-800 line-clamp-1">{tip.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                          {tip.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {tip.isVisible ? (
                          <span className="text-emerald-600 flex items-center gap-1.5 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Visible
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1.5 font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> Hidden
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(tip.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button onClick={() => handleEdit(tip)} className="text-blue-600 hover:text-blue-800 font-medium text-sm">Edit</button>
                          <button onClick={() => handleDelete(tip._id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">{editingTip ? 'Edit Care Tip' : 'Add New Care Tip'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 font-bold text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tip Title</label>
                <input 
                  type="text" name="title" required
                  value={formData.title} onChange={handleInputChange}
                  placeholder="e.g., Safe Sleep for Newborns"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Category</label>
                  <select 
                    name="category" value={formData.category} onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Featured Image</label>
                  <input 
                    type="file" accept="image/*" onChange={handleImageChange}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Tip Content</label>
                <textarea 
                  name="content" required rows="6"
                  value={formData.content} onChange={handleInputChange}
                  placeholder="Write the full tip content here..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                ></textarea>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <input 
                  type="checkbox" name="isVisible" id="isVisible"
                  checked={formData.isVisible} onChange={handleInputChange}
                  className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-slate-300 rounded"
                />
                <label htmlFor="isVisible" className="text-sm font-medium text-slate-700 cursor-pointer">
                  Make this tip visible on the website immediately
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md shadow-emerald-500/20 transition-all active:scale-95"
                >
                  {editingTip ? 'Update Tip' : 'Publish Tip'}
                </button>
                <button 
                  type="button" onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BabyCareTips;
