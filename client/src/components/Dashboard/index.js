import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './style.css';
import CalendarWidget from '../CalendarWidget';
import SelfReflectionWidget from '../SelfReflectionWidget';
import JournalWidget from '../JournalWidget';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  // Define the layout for the widgets
  const layout = [
    { i: 'calendar', x: 0, y: 0, w: 4, h: 6 },
    { i: 'selfReflection', x: 4, y: 0, w: 4, h: 6 },
    { i: 'journal', x: 8, y: 0, w: 4, h: 6 },
  ];

  return (
    <div className="dashboard">
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={30}
        draggableHandle=".widget-handle"
        resizeHandle=".widget-resize-handle"
      >
        <div key="calendar" className="widget">
          <CalendarWidget />
        </div>
        <div key="selfReflection" className="widget">
          <SelfReflectionWidget />
        </div>
        <div key="journal" className="widget">
          <JournalWidget />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
