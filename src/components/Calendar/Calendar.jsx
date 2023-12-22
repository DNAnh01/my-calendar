import React from 'react';
import { startOfMonth, endOfMonth, differenceInDays, format, sub, add, setDate } from 'date-fns';

import classNames from 'classnames/bind';
import styles from './Calendar.module.scss';

import Cell from '~/components/Cell';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const cx = classNames.bind(styles);
const Calendar = ({ value, onChange }) => {
    const startDate = startOfMonth(value);
    const endDate = endOfMonth(value);
    const numDays = differenceInDays(endDate, startDate) + 1;

    const prefixDays = startDate.getDay();
    const suffixDays = 6 - endDate.getDay();

    const prevMonth = () => onChange && onChange(sub(value, { months: 1 }));
    const nextMonth = () => onChange && onChange(add(value, { months: 1 }));

    const prevYear = () => onChange && onChange(sub(value, { years: 1 }));
    const nextYear = () => onChange && onChange(add(value, { years: 1 }));

    const handleClickDate = (index) => {
        const date = setDate(value, index);
        onChange && onChange(date);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('content')}>
                <Cell onClick={prevYear}>{'<<'}</Cell>
                <Cell onClick={prevMonth}>{'<'}</Cell>
                <Cell className={cx('title')}>{format(value, 'LLLL yyyy')}</Cell>
                <Cell onClick={nextMonth}>{'>'}</Cell>
                <Cell onClick={nextYear}>{'>>'}</Cell>

                {daysOfWeek.map((day) => (
                    <Cell key={day} className={cx('days-of-week')}>
                        {day}
                    </Cell>
                ))}

                {Array.from({ length: prefixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}

                {Array.from({ length: numDays }).map((_, index) => {
                    const date = index + 1;
                    const isCurrentDate = date === value.getDate();
                    return (
                        <Cell key={index} active={isCurrentDate} onClick={() => handleClickDate(date)}>
                            {date}
                        </Cell>
                    );
                })}

                {Array.from({ length: suffixDays }).map((_, index) => (
                    <Cell key={index} />
                ))}
            </div>
        </div>
    );
};

export default Calendar;
