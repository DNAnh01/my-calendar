import { useState } from 'react';
import './App.css';

import { format } from 'date-fns';
import Calendar from '~/components/Calendar';

const App = () => {
    const [currentDate, setCurrentDate] = useState(new Date('2023-01-01'));

    const handleSetToday = () => {
        setCurrentDate(new Date());
    };
    return (
        <div className={`App align-items-center d-flex flex-column mt-5 gap-4`}>
            <div>Selected day: {format(currentDate, 'dd LLL yyyy')}</div>
            <button onClick={handleSetToday}>Today</button>
            <Calendar value={currentDate} onChange={setCurrentDate} />
        </div>
    );
};

export default App;
