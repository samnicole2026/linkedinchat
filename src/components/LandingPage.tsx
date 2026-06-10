import React, { useState } from 'react';
import { Calendar, MessageSquare, Link2, Edit3, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onSelectEntry: (entry: 'chat' | 'connect' | 'input') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectEntry }) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Calendar className="w-16 h-16 text-indigo-600" />
            <h1 className="text-6xl font-bold text-gray-900">PLANelope</h1>
          </div>
          
          <p className="text-2xl font-medium text-gray-700 mb-4">
            Stop being busy. Start being intentional.
          </p>
          
          <p className="text-lg text-gray-600 mb-12">
            Your AI-powered life planner that aligns your schedule with your goals.
          </p>

          {!showOptions ? (
            <button
              onClick={() => setShowOptions(true)}
              className="group bg-indigo-600 text-white px-12 py-4 rounded-xl text-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span className="flex items-center gap-3">
                Start Scheduling
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 animate-fadeIn">
              <button
                onClick={() => onSelectEntry('chat')}
                className="group bg-white border-2 border-indigo-200 rounded-2xl p-8 hover:border-indigo-500 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                    <MessageSquare className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Chat with PLANelope
                  </h3>
                  <p className="text-sm text-gray-600">
                    Let AI help you organize your schedule through conversation
                  </p>
                </div>
              </button>

              <button
                onClick={() => onSelectEntry('connect')}
                className="group bg-white border-2 border-purple-200 rounded-2xl p-8 hover:border-purple-500 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Link2 className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Connect Your Calendar
                  </h3>
                  <p className="text-sm text-gray-600">
                    Sync with Google or Outlook Calendar automatically
                  </p>
                </div>
              </button>

              <button
                onClick={() => onSelectEntry('input')}
                className="group bg-white border-2 border-pink-200 rounded-2xl p-8 hover:border-pink-500 hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                    <Edit3 className="w-8 h-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Input Your Calendar
                  </h3>
                  <p className="text-sm text-gray-600">
                    Manually add your events and commitments
                  </p>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
