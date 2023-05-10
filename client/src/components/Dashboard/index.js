import { WidthProvider, Responsive } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import './style.css';
import CalendarWidget from '../CalendarWidget';
import SelfReflectionWidget from '../SelfReflectionWidget';
import JournalWidget from '../JournalWidget';
import { useState, useEffect } from 'react';

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  // Define the layout for the widgets
  const layout = [
    { i: 'calendar', x: 0, y: 0, w: 4, h: 6 },
    { i: 'selfReflection', x: 4, y: 0, w: 4, h: 6 },
    { i: 'journal', x: 8, y: 0, w: 4, h: 6 },
  ];

  // Set up state for current time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <header 
        style={{ 
          backgroundImage: "url('https://media0.giphy.com/media/l378b9LcC3cclsY2A/giphy.gif?cid=ecf05e477w21yo93n940hsi8o15chbg31ylk68u5ccmpjwhr&ep=v1_gifs_search&rid=giphy.gif&ct=g')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100%',
          height: '15vw'
        }}
      >
        <h1>Dashboard</h1>
        <p>{currentTime.toLocaleTimeString()}</p>
      </header>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        rowHeight={30}
      >
        <div key="calendar">
          <CalendarWidget />
        </div>
        <div key="selfReflection">
          <SelfReflectionWidget />
        </div>
        <div key="journal">
          <JournalWidget />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
