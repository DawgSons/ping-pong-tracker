import React, {useState} from 'react';
import {Map, Plus, List} from 'lucide-react';

const AppLayout = ()=> {
  const [view, setView] = useState('map');

  return (
    <div className="h-screen flex flex-col">
      {/* Main */}
      <main className="flex-1 relative overflow-hidden">
        {/* {children} */}

      {/*Floating Action Button*/}

      <button
          className="fixed right-4 bottom-20 w-14 h-14 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white"
          onClick={() => setView('add')}
        >
          <Plus size={24} />
        </button>
      </main>

            {/* Bottom Navigation */}
            <nav className="h-16 bg-white border-t flex items-center justify-around fixed bottom-0 w-full">
        <button
          className={`p-4 flex flex-col items-center ${view === 'map' ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={() => setView('map')}
        >
          <Map size={24} />
          <span className="text-xs mt-1">Platten</span>
        </button>

        <button
          className={`p-4 flex flex-col items-center ${view === 'list' ? 'text-blue-500' : 'text-gray-500'}`}
          onClick={() => setView('list')}
        >
          <List size={24} />
          <span className="text-xs mt-1">List</span>
        </button>
      </nav>
      </div>
  );
};

export default AppLayout;