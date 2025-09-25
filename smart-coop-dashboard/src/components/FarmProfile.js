import React, { useState } from 'react';
import { PhotoIcon, PencilSquareIcon, TrophyIcon, PlusIcon } from '@heroicons/react/24/outline';

const FarmProfile = () => {
  const [farmPhotos, setFarmPhotos] = useState([]);
  const [productionUpdates, setProductionUpdates] = useState([
    { id: 1, date: '2024-09-24', count: 42, notes: 'Great production day!' },
    { id: 2, date: '2024-09-23', count: 38, notes: 'Chickens are healthy' }
  ]);
  const [farmStories, setFarmStories] = useState([
    { id: 1, date: '2024-09-24', content: 'Our chickens are enjoying the sunny weather today!' },
    { id: 2, date: '2024-09-22', content: 'New organic feed has arrived. The chickens love it!' }
  ]);
  const [newUpdate, setNewUpdate] = useState({ count: '', notes: '' });
  const [newStory, setNewStory] = useState('');

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      date: new Date().toISOString().split('T')[0]
    }));
    setFarmPhotos([...farmPhotos, ...newPhotos]);
  };

  const handleAddUpdate = () => {
    if (newUpdate.count) {
      const update = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        count: parseInt(newUpdate.count),
        notes: newUpdate.notes
      };
      setProductionUpdates([update, ...productionUpdates]);
      setNewUpdate({ count: '', notes: '' });
    }
  };

  const handleAddStory = () => {
    if (newStory.trim()) {
      const story = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        content: newStory.trim()
      };
      setFarmStories([story, ...farmStories]);
      setNewStory('');
    }
  };

  const certifications = [
    { name: 'Organic Certified', icon: '🌱', color: 'bg-green-100 text-green-600' },
    { name: 'Free Range', icon: '🐔', color: 'bg-yellow-100 text-yellow-600' },
    { name: 'Non-GMO', icon: '✅', color: 'bg-blue-100 text-blue-600' },
    { name: 'Local Farm', icon: '🏡', color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="flex-1 p-8 bg-green-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Farm Profile</h1>
        <p className="text-slate-600">Share your farm's story and transparency with customers</p>
      </div>

      <div className="space-y-8">
        {/* Farm Photos Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <PhotoIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Farm Photos</h2>
              <p className="text-sm text-slate-500">Share daily images of your farm operations</p>
            </div>
          </div>

          {/* Upload Area */}
          <div className="mb-6">
            <label className="block">
              <div className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors">
                <div className="text-center">
                  <PhotoIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">Click to upload farm photos</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                </div>
              </div>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Photo Gallery */}
          {farmPhotos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {farmPhotos.map((photo) => (
                <div key={photo.id} className="relative group">
                  <img
                    src={photo.url}
                    alt="Farm photo"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-lg flex items-center justify-center">
                    <span className="text-white text-xs opacity-0 group-hover:opacity-100">{photo.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Production Updates Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🥚</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Production Updates</h2>
              <p className="text-sm text-slate-500">Share your daily egg production with customers</p>
            </div>
          </div>

          {/* Add New Update Form */}
          <div className="mb-6 p-4 bg-green-50 rounded-xl">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Add Today's Production</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-slate-600 mb-1">Egg Count</label>
                <input
                  type="number"
                  value={newUpdate.count}
                  onChange={(e) => setNewUpdate({...newUpdate, count: e.target.value})}
                  placeholder="42"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 mb-1">Notes (optional)</label>
                <input
                  type="text"
                  value={newUpdate.notes}
                  onChange={(e) => setNewUpdate({...newUpdate, notes: e.target.value})}
                  placeholder="Any special notes..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <button
              onClick={handleAddUpdate}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Share Update
            </button>
          </div>

          {/* Updates List */}
          <div className="space-y-4">
            {productionUpdates.map((update) => (
              <div key={update.id} className="p-4 border border-green-200 rounded-xl bg-green-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-slate-900">{update.count} eggs</span>
                  <span className="text-sm text-slate-500">{update.date}</span>
                </div>
                {update.notes && <p className="text-sm text-slate-600">{update.notes}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Farm Story Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <PencilSquareIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Farm Story</h2>
              <p className="text-sm text-slate-500">Share updates and stories with your customers</p>
            </div>
          </div>

          {/* Add New Story Form */}
          <div className="mb-6 p-4 bg-purple-50 rounded-xl">
            <h3 className="text-sm font-medium text-slate-700 mb-3">Share a Story</h3>
            <textarea
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
              placeholder="What's happening on the farm today?"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-3"
            />
            <button
              onClick={handleAddStory}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <PlusIcon className="w-4 h-4" />
              Post Story
            </button>
          </div>

          {/* Stories List */}
          <div className="space-y-4">
            {farmStories.map((story) => (
              <div key={story.id} className="p-4 border border-purple-200 rounded-xl bg-purple-50">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-slate-500">{story.date}</span>
                </div>
                <p className="text-slate-700">{story.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Certifications Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-green-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <TrophyIcon className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Quality Certifications</h2>
              <p className="text-sm text-slate-500">Display your farm's credentials and certifications</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center p-4 border border-orange-200 rounded-xl bg-orange-50">
                <div className={`w-12 h-12 ${cert.color} rounded-full flex items-center justify-center mx-auto mb-3 text-xl`}>
                  {cert.icon}
                </div>
                <h3 className="font-medium text-slate-900 text-sm">{cert.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmProfile;